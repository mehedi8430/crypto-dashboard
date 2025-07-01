import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTitleStore } from '@/stores/titleStore';
import { database } from '@/Firebase/Firebase';
import { ref, push, set } from 'firebase/database';

const formSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters' }).max(50),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  note: z.string().min(2, { message: 'Note must be at least 2 characters' })
});

export default function DataForms() {
  const { setTitle } = useTitleStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setTitle('Create Data');
    return () => setTitle('Dashboard');
  }, [setTitle]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      note: ''
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const newRecordRef = push(ref(database, 'records'));
      
      await set(newRecordRef, {
        ...values,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        id: newRecordRef.key
      });

      setSubmitSuccess(true);
      form.reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <div className='section-container w-1/2'>
        <h2 className='text-xl font-bold mb-6'>Create New Record</h2>
        
        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            Record created successfully!
          </div>
        )}

        {submitError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {submitError}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Form fields remain the same as your original */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='Enter your username' 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='Enter your email' 
                      type='email'
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder='Enter your note' 
                      {...field} 
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type='submit' 
              disabled={isSubmitting}
              className='w-full'
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}