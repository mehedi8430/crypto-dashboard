import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTitleStore } from '@/stores/titleStore';
import { useEffect } from 'react';
import { db, database } from '@/Firebase/Firebase'; // Import Firestore and Realtime Database instances
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { ref, set } from 'firebase/database'; // Import Realtime Database functions
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs

// Define your form schema
const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email().min(2),
  note: z.string().min(2)
});

export default function DataForms() {
  const { setTitle } = useTitleStore();

  useEffect(() => {
    setTitle('Create Data');
    return () => setTitle('Dashboard');
  }, [setTitle]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      note: ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Firestore
      const docRef = await addDoc(collection(db, 'records'), values);
      console.log('Document written with ID: ', docRef.id);

      // Realtime Database
      const recordId = uuidv4();
      await set(ref(database, 'records/' + recordId), values);
      console.log('Data saved to Realtime Database with ID: ', recordId);

      alert('Record successfully created!');

    } catch (error) {
      console.error('Error creating record:', error);
      alert('Failed to create record. Please try again.');
    }
  }

  return (
    <>
      <section>
        <div className='section-container w-1/2'>
          <h2 className='text-xl font-bold'>Form Data</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your Username' {...field} />
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
                      <Input placeholder='Enter your Email' {...field} />
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
                      <Input placeholder='Enter note' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};