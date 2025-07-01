import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

// Sample data for different months
const monthlyData = {
  january: [
    { date: "Mon 9AM", total_nav: 810, time: "09:00" },
    { date: "Mon 12PM", total_nav: 822, time: "12:00" },
    { date: "Mon 3PM", total_nav: 825, time: "15:00" },
    { date: "Mon 6PM", total_nav: 818, time: "18:00" },
    { date: "Tue 9AM", total_nav: 815, time: "09:00" },
    { date: "Tue 12PM", total_nav: 820, time: "12:00" },
    { date: "Tue 3PM", total_nav: 828, time: "15:00" },
    { date: "Tue 6PM", total_nav: 822, time: "18:00" },
    { date: "Wed 9AM", total_nav: 830, time: "09:00" },
    { date: "Wed 12PM", total_nav: 835, time: "12:00" },
    { date: "Wed 3PM", total_nav: 840, time: "15:00" },
    { date: "Wed 6PM", total_nav: 832, time: "18:00" },
    { date: "Thu 9AM", total_nav: 820, time: "09:00" },
    { date: "Thu 12PM", total_nav: 825, time: "12:00" },
    { date: "Thu 3PM", total_nav: 830, time: "15:00" },
    { date: "Thu 6PM", total_nav: 823, time: "18:00" },
    { date: "Fri 9AM", total_nav: 818, time: "09:00" },
    { date: "Fri 12PM", total_nav: 825, time: "12:00" },
    { date: "Fri 3PM", total_nav: 832, time: "15:00" },
    { date: "Fri 6PM", total_nav: 828, time: "18:00" },
    { date: "Sat 9AM", total_nav: 815, time: "09:00" },
    { date: "Sat 12PM", total_nav: 820, time: "12:00" },
    { date: "Sat 3PM", total_nav: 825, time: "15:00" },
    { date: "Sat 6PM", total_nav: 818, time: "18:00" },
    { date: "Sun 9AM", total_nav: 808, time: "09:00" },
    { date: "Sun 12PM", total_nav: 814, time: "12:00" },
    { date: "Sun 3PM", total_nav: 820, time: "15:00" },
    { date: "Sun 6PM", total_nav: 816, time: "18:00" },
    { date: "Sun 6PM", total_nav: 816, time: "18:00" },
  ],
  february: [
    { date: "Mon 9AM", total_nav: 840, time: "09:00" },
    { date: "Mon 12PM", total_nav: 845, time: "12:00" },
    { date: "Mon 3PM", total_nav: 850, time: "15:00" },
    { date: "Mon 6PM", total_nav: 843, time: "18:00" },
    { date: "Tue 9AM", total_nav: 845, time: "09:00" },
    { date: "Tue 12PM", total_nav: 850, time: "12:00" },
    { date: "Tue 3PM", total_nav: 858, time: "15:00" },
    { date: "Tue 6PM", total_nav: 852, time: "18:00" },
    { date: "Wed 9AM", total_nav: 850, time: "09:00" },
    { date: "Wed 12PM", total_nav: 855, time: "12:00" },
    { date: "Wed 3PM", total_nav: 862, time: "15:00" },
    { date: "Wed 6PM", total_nav: 857, time: "18:00" },
    { date: "Thu 9AM", total_nav: 843, time: "09:00" },
    { date: "Thu 12PM", total_nav: 848, time: "12:00" },
    { date: "Thu 3PM", total_nav: 855, time: "15:00" },
    { date: "Thu 6PM", total_nav: 850, time: "18:00" },
    { date: "Fri 9AM", total_nav: 847, time: "09:00" },
    { date: "Fri 12PM", total_nav: 852, time: "12:00" },
    { date: "Fri 3PM", total_nav: 860, time: "15:00" },
    { date: "Fri 6PM", total_nav: 855, time: "18:00" },
    { date: "Sat 9AM", total_nav: 842, time: "09:00" },
    { date: "Sat 12PM", total_nav: 847, time: "12:00" },
    { date: "Sat 3PM", total_nav: 853, time: "15:00" },
    { date: "Sat 6PM", total_nav: 848, time: "18:00" },
    { date: "Sun 9AM", total_nav: 855, time: "09:00" },
    { date: "Sun 12PM", total_nav: 860, time: "12:00" },
    { date: "Sun 3PM", total_nav: 868, time: "15:00" },
    { date: "Sun 6PM", total_nav: 863, time: "18:00" },
    { date: "Sun 6PM", total_nav: 863, time: "18:00" },
    { date: "Sun 6PM", total_nav: 863, time: "18:00" },
  ],
  march: [
    { date: "Mon 9AM", total_nav: 775, time: "09:00" },
    { date: "Mon 12PM", total_nav: 780, time: "12:00" },
    { date: "Mon 3PM", total_nav: 785, time: "15:00" },
    { date: "Mon 6PM", total_nav: 778, time: "18:00" },
    { date: "Tue 9AM", total_nav: 780, time: "09:00" },
    { date: "Tue 12PM", total_nav: 785, time: "12:00" },
    { date: "Tue 3PM", total_nav: 792, time: "15:00" },
    { date: "Tue 6PM", total_nav: 787, time: "18:00" },
    { date: "Wed 9AM", total_nav: 785, time: "09:00" },
    { date: "Wed 12PM", total_nav: 790, time: "12:00" },
    { date: "Wed 3PM", total_nav: 798, time: "15:00" },
    { date: "Wed 6PM", total_nav: 793, time: "18:00" },
    { date: "Thu 9AM", total_nav: 783, time: "09:00" },
    { date: "Thu 12PM", total_nav: 788, time: "12:00" },
    { date: "Thu 3PM", total_nav: 795, time: "15:00" },
    { date: "Thu 6PM", total_nav: 790, time: "18:00" },
    { date: "Fri 9AM", total_nav: 787, time: "09:00" },
    { date: "Fri 12PM", total_nav: 792, time: "12:00" },
    { date: "Fri 3PM", total_nav: 800, time: "15:00" },
    { date: "Fri 6PM", total_nav: 795, time: "18:00" },
    { date: "Sat 9AM", total_nav: 782, time: "09:00" },
    { date: "Sat 12PM", total_nav: 787, time: "12:00" },
    { date: "Sat 3PM", total_nav: 793, time: "15:00" },
    { date: "Sat 6PM", total_nav: 788, time: "18:00" },
    { date: "Sun 9AM", total_nav: 790, time: "09:00" },
    { date: "Sun 12PM", total_nav: 795, time: "12:00" },
    { date: "Sun 3PM", total_nav: 802, time: "15:00" },
    { date: "Sun 6PM", total_nav: 798, time: "18:00" },
    { date: "Sun 6PM", total_nav: 798, time: "18:00" },
    { date: "Sun 6PM", total_nav: 798, time: "18:00" },
  ],
  april: [
    { date: "Mon 9AM", total_nav: 905, time: "09:00" },
    { date: "Mon 12PM", total_nav: 910, time: "12:00" },
    { date: "Mon 3PM", total_nav: 918, time: "15:00" },
    { date: "Mon 6PM", total_nav: 912, time: "18:00" },
    { date: "Tue 9AM", total_nav: 910, time: "09:00" },
    { date: "Tue 12PM", total_nav: 915, time: "12:00" },
    { date: "Tue 3PM", total_nav: 925, time: "15:00" },
    { date: "Tue 6PM", total_nav: 920, time: "18:00" },
    { date: "Wed 9AM", total_nav: 915, time: "09:00" },
    { date: "Wed 12PM", total_nav: 920, time: "12:00" },
    { date: "Wed 3PM", total_nav: 928, time: "15:00" },
    { date: "Wed 6PM", total_nav: 923, time: "18:00" },
    { date: "Thu 9AM", total_nav: 913, time: "09:00" },
    { date: "Thu 12PM", total_nav: 918, time: "12:00" },
    { date: "Thu 3PM", total_nav: 925, time: "15:00" },
    { date: "Thu 6PM", total_nav: 920, time: "18:00" },
    { date: "Fri 9AM", total_nav: 917, time: "09:00" },
    { date: "Fri 12PM", total_nav: 922, time: "12:00" },
    { date: "Fri 3PM", total_nav: 930, time: "15:00" },
    { date: "Fri 6PM", total_nav: 925, time: "18:00" },
    { date: "Sat 9AM", total_nav: 912, time: "09:00" },
    { date: "Sat 12PM", total_nav: 917, time: "12:00" },
    { date: "Sat 3PM", total_nav: 923, time: "15:00" },
    { date: "Sat 6PM", total_nav: 918, time: "18:00" },
    { date: "Sun 9AM", total_nav: 920, time: "09:00" },
    { date: "Sun 12PM", total_nav: 925, time: "12:00" },
    { date: "Sun 3PM", total_nav: 933, time: "15:00" },
    { date: "Sun 6PM", total_nav: 928, time: "18:00" },
  ],
  may: [
    { date: "Mon 9AM", total_nav: 870, time: "09:00" },
    { date: "Mon 12PM", total_nav: 875, time: "12:00" },
    { date: "Mon 3PM", total_nav: 882, time: "15:00" },
    { date: "Mon 6PM", total_nav: 877, time: "18:00" },
    { date: "Tue 9AM", total_nav: 875, time: "09:00" },
    { date: "Tue 12PM", total_nav: 880, time: "12:00" },
    { date: "Tue 3PM", total_nav: 888, time: "15:00" },
    { date: "Tue 6PM", total_nav: 883, time: "18:00" },
    { date: "Wed 9AM", total_nav: 880, time: "09:00" },
    { date: "Wed 12PM", total_nav: 885, time: "12:00" },
    { date: "Wed 3PM", total_nav: 893, time: "15:00" },
    { date: "Wed 6PM", total_nav: 888, time: "18:00" },
    { date: "Thu 9AM", total_nav: 878, time: "09:00" },
    { date: "Thu 12PM", total_nav: 883, time: "12:00" },
    { date: "Thu 3PM", total_nav: 890, time: "15:00" },
    { date: "Thu 6PM", total_nav: 885, time: "18:00" },
    { date: "Fri 9AM", total_nav: 882, time: "09:00" },
    { date: "Fri 12PM", total_nav: 887, time: "12:00" },
    { date: "Fri 3PM", total_nav: 895, time: "15:00" },
    { date: "Fri 6PM", total_nav: 890, time: "18:00" },
    { date: "Sat 9AM", total_nav: 877, time: "09:00" },
    { date: "Sat 12PM", total_nav: 882, time: "12:00" },
    { date: "Sat 3PM", total_nav: 888, time: "15:00" },
    { date: "Sat 6PM", total_nav: 883, time: "18:00" },
    { date: "Sun 9AM", total_nav: 885, time: "09:00" },
    { date: "Sun 12PM", total_nav: 890, time: "12:00" },
    { date: "Sun 3PM", total_nav: 898, time: "15:00" },
    { date: "Sun 6PM", total_nav: 893, time: "18:00" },
  ],
  june: [
    { date: "Mon 9AM", total_nav: 945, time: "09:00" },
    { date: "Mon 12PM", total_nav: 950, time: "12:00" },
    { date: "Mon 3PM", total_nav: 958, time: "15:00" },
    { date: "Mon 6PM", total_nav: 952, time: "18:00" },
    { date: "Tue 9AM", total_nav: 950, time: "09:00" },
    { date: "Tue 12PM", total_nav: 955, time: "12:00" },
    { date: "Tue 3PM", total_nav: 963, time: "15:00" },
    { date: "Tue 6PM", total_nav: 958, time: "18:00" },
    { date: "Wed 9AM", total_nav: 955, time: "09:00" },
    { date: "Wed 12PM", total_nav: 960, time: "12:00" },
    { date: "Wed 3PM", total_nav: 968, time: "15:00" },
    { date: "Wed 6PM", total_nav: 963, time: "18:00" },
    { date: "Thu 9AM", total_nav: 953, time: "09:00" },
    { date: "Thu 12PM", total_nav: 958, time: "12:00" },
    { date: "Thu 3PM", total_nav: 965, time: "15:00" },
    { date: "Thu 6PM", total_nav: 960, time: "18:00" },
    { date: "Fri 9AM", total_nav: 957, time: "09:00" },
    { date: "Fri 12PM", total_nav: 962, time: "12:00" },
    { date: "Fri 3PM", total_nav: 970, time: "15:00" },
    { date: "Fri 6PM", total_nav: 965, time: "18:00" },
    { date: "Sat 9AM", total_nav: 952, time: "09:00" },
    { date: "Sat 12PM", total_nav: 957, time: "12:00" },
    { date: "Sat 3PM", total_nav: 963, time: "15:00" },
    { date: "Sat 6PM", total_nav: 958, time: "18:00" },
    { date: "Sun 9AM", total_nav: 960, time: "09:00" },
    { date: "Sun 12PM", total_nav: 965, time: "12:00" },
    { date: "Sun 3PM", total_nav: 973, time: "15:00" },
    { date: "Sun 6PM", total_nav: 968, time: "18:00" },
  ],
  july: [
    { date: "Mon 9AM", total_nav: 795, time: "09:00" },
    { date: "Mon 12PM", total_nav: 800, time: "12:00" },
    { date: "Mon 3PM", total_nav: 808, time: "15:00" },
    { date: "Mon 6PM", total_nav: 802, time: "18:00" },
    { date: "Tue 9AM", total_nav: 800, time: "09:00" },
    { date: "Tue 12PM", total_nav: 805, time: "12:00" },
    { date: "Tue 3PM", total_nav: 813, time: "15:00" },
    { date: "Tue 6PM", total_nav: 808, time: "18:00" },
    { date: "Wed 9AM", total_nav: 805, time: "09:00" },
    { date: "Wed 12PM", total_nav: 810, time: "12:00" },
    { date: "Wed 3PM", total_nav: 818, time: "15:00" },
    { date: "Wed 6PM", total_nav: 813, time: "18:00" },
    { date: "Thu 9AM", total_nav: 803, time: "09:00" },
    { date: "Thu 12PM", total_nav: 808, time: "12:00" },
    { date: "Thu 3PM", total_nav: 815, time: "15:00" },
    { date: "Thu 6PM", total_nav: 810, time: "18:00" },
    { date: "Fri 9AM", total_nav: 807, time: "09:00" },
    { date: "Fri 12PM", total_nav: 812, time: "12:00" },
    { date: "Fri 3PM", total_nav: 820, time: "15:00" },
    { date: "Fri 6PM", total_nav: 815, time: "18:00" },
    { date: "Sat 9AM", total_nav: 802, time: "09:00" },
    { date: "Sat 12PM", total_nav: 807, time: "12:00" },
    { date: "Sat 3PM", total_nav: 813, time: "15:00" },
    { date: "Sat 6PM", total_nav: 808, time: "18:00" },
    { date: "Sun 9AM", total_nav: 810, time: "09:00" },
    { date: "Sun 12PM", total_nav: 815, time: "12:00" },
    { date: "Sun 3PM", total_nav: 823, time: "15:00" },
    { date: "Sun 6PM", total_nav: 818, time: "18:00" },
  ],
  august: [
    { date: "Mon 9AM", total_nav: 885, time: "09:00" },
    { date: "Mon 12PM", total_nav: 890, time: "12:00" },
    { date: "Mon 3PM", total_nav: 898, time: "15:00" },
    { date: "Mon 6PM", total_nav: 892, time: "18:00" },
    { date: "Tue 9AM", total_nav: 890, time: "09:00" },
    { date: "Tue 12PM", total_nav: 895, time: "12:00" },
    { date: "Tue 3PM", total_nav: 903, time: "15:00" },
    { date: "Tue 6PM", total_nav: 898, time: "18:00" },
    { date: "Wed 9AM", total_nav: 895, time: "09:00" },
    { date: "Wed 12PM", total_nav: 900, time: "12:00" },
    { date: "Wed 3PM", total_nav: 908, time: "15:00" },
    { date: "Wed 6PM", total_nav: 903, time: "18:00" },
    { date: "Thu 9AM", total_nav: 893, time: "09:00" },
    { date: "Thu 12PM", total_nav: 898, time: "12:00" },
    { date: "Thu 3PM", total_nav: 905, time: "15:00" },
    { date: "Thu 6PM", total_nav: 900, time: "18:00" },
    { date: "Fri 9AM", total_nav: 897, time: "09:00" },
    { date: "Fri 12PM", total_nav: 902, time: "12:00" },
    { date: "Fri 3PM", total_nav: 910, time: "15:00" },
    { date: "Fri 6PM", total_nav: 905, time: "18:00" },
    { date: "Sat 9AM", total_nav: 892, time: "09:00" },
    { date: "Sat 12PM", total_nav: 897, time: "12:00" },
    { date: "Sat 3PM", total_nav: 903, time: "15:00" },
    { date: "Sat 6PM", total_nav: 898, time: "18:00" },
    { date: "Sun 9AM", total_nav: 900, time: "09:00" },
    { date: "Sun 12PM", total_nav: 905, time: "12:00" },
    { date: "Sun 3PM", total_nav: 913, time: "15:00" },
    { date: "Sun 6PM", total_nav: 908, time: "18:00" },
  ],
  september: [
    { date: "Mon 9AM", total_nav: 755, time: "09:00" },
    { date: "Mon 12PM", total_nav: 760, time: "12:00" },
    { date: "Mon 3PM", total_nav: 768, time: "15:00" },
    { date: "Mon 6PM", total_nav: 762, time: "18:00" },
    { date: "Tue 9AM", total_nav: 760, time: "09:00" },
    { date: "Tue 12PM", total_nav: 765, time: "12:00" },
    { date: "Tue 3PM", total_nav: 773, time: "15:00" },
    { date: "Tue 6PM", total_nav: 768, time: "18:00" },
    { date: "Wed 9AM", total_nav: 765, time: "09:00" },
    { date: "Wed 12PM", total_nav: 770, time: "12:00" },
    { date: "Wed 3PM", total_nav: 778, time: "15:00" },
    { date: "Wed 6PM", total_nav: 773, time: "18:00" },
    { date: "Thu 9AM", total_nav: 763, time: "09:00" },
    { date: "Thu 12PM", total_nav: 768, time: "12:00" },
    { date: "Thu 3PM", total_nav: 775, time: "15:00" },
    { date: "Thu 6PM", total_nav: 770, time: "18:00" },
    { date: "Fri 9AM", total_nav: 767, time: "09:00" },
    { date: "Fri 12PM", total_nav: 772, time: "12:00" },
    { date: "Fri 3PM", total_nav: 780, time: "15:00" },
    { date: "Fri 6PM", total_nav: 775, time: "18:00" },
    { date: "Sat 9AM", total_nav: 762, time: "09:00" },
    { date: "Sat 12PM", total_nav: 767, time: "12:00" },
    { date: "Sat 3PM", total_nav: 773, time: "15:00" },
    { date: "Sat 6PM", total_nav: 768, time: "18:00" },
    { date: "Sun 9AM", total_nav: 770, time: "09:00" },
    { date: "Sun 12PM", total_nav: 775, time: "12:00" },
    { date: "Sun 3PM", total_nav: 783, time: "15:00" },
    { date: "Sun 6PM", total_nav: 778, time: "18:00" },
  ],
  october: [
    { date: "Mon 9AM", total_nav: 935, time: "09:00" },
    { date: "Mon 12PM", total_nav: 940, time: "12:00" },
    { date: "Mon 3PM", total_nav: 948, time: "15:00" },
    { date: "Mon 6PM", total_nav: 942, time: "18:00" },
    { date: "Tue 9AM", total_nav: 940, time: "09:00" },
    { date: "Tue 12PM", total_nav: 945, time: "12:00" },
    { date: "Tue 3PM", total_nav: 953, time: "15:00" },
    { date: "Tue 6PM", total_nav: 948, time: "18:00" },
    { date: "Wed 9AM", total_nav: 945, time: "09:00" },
    { date: "Wed 12PM", total_nav: 950, time: "12:00" },
    { date: "Wed 3PM", total_nav: 958, time: "15:00" },
    { date: "Wed 6PM", total_nav: 953, time: "18:00" },
    { date: "Thu 9AM", total_nav: 943, time: "09:00" },
    { date: "Thu 12PM", total_nav: 948, time: "12:00" },
    { date: "Thu 3PM", total_nav: 955, time: "15:00" },
    { date: "Thu 6PM", total_nav: 950, time: "18:00" },
    { date: "Fri 9AM", total_nav: 947, time: "09:00" },
    { date: "Fri 12PM", total_nav: 952, time: "12:00" },
    { date: "Fri 3PM", total_nav: 960, time: "15:00" },
    { date: "Fri 6PM", total_nav: 955, time: "18:00" },
    { date: "Sat 9AM", total_nav: 942, time: "09:00" },
    { date: "Sat 12PM", total_nav: 947, time: "12:00" },
    { date: "Sat 3PM", total_nav: 953, time: "15:00" },
    { date: "Sat 6PM", total_nav: 948, time: "18:00" },
    { date: "Sun 9AM", total_nav: 950, time: "09:00" },
    { date: "Sun 12PM", total_nav: 955, time: "12:00" },
    { date: "Sun 3PM", total_nav: 963, time: "15:00" },
    { date: "Sun 6PM", total_nav: 958, time: "18:00" },
  ],
  november: [
    { date: "Mon 9AM", total_nav: 815, time: "09:00" },
    { date: "Mon 12PM", total_nav: 820, time: "12:00" },
    { date: "Mon 3PM", total_nav: 828, time: "15:00" },
    { date: "Mon 6PM", total_nav: 822, time: "18:00" },
    { date: "Tue 9AM", total_nav: 820, time: "09:00" },
    { date: "Tue 12PM", total_nav: 825, time: "12:00" },
    { date: "Tue 3PM", total_nav: 833, time: "15:00" },
    { date: "Tue 6PM", total_nav: 828, time: "18:00" },
    { date: "Wed 9AM", total_nav: 825, time: "09:00" },
    { date: "Wed 12PM", total_nav: 830, time: "12:00" },
    { date: "Wed 3PM", total_nav: 838, time: "15:00" },
    { date: "Wed 6PM", total_nav: 833, time: "18:00" },
    { date: "Thu 9AM", total_nav: 823, time: "09:00" },
    { date: "Thu 12PM", total_nav: 828, time: "12:00" },
    { date: "Thu 3PM", total_nav: 835, time: "15:00" },
    { date: "Thu 6PM", total_nav: 830, time: "18:00" },
    { date: "Fri 9AM", total_nav: 827, time: "09:00" },
    { date: "Fri 12PM", total_nav: 832, time: "12:00" },
    { date: "Fri 3PM", total_nav: 840, time: "15:00" },
    { date: "Fri 6PM", total_nav: 835, time: "18:00" },
    { date: "Sat 9AM", total_nav: 822, time: "09:00" },
    { date: "Sat 12PM", total_nav: 827, time: "12:00" },
    { date: "Sat 3PM", total_nav: 833, time: "15:00" },
    { date: "Sat 6PM", total_nav: 828, time: "18:00" },
    { date: "Sun 9AM", total_nav: 830, time: "09:00" },
    { date: "Sun 12PM", total_nav: 835, time: "12:00" },
    { date: "Sun 3PM", total_nav: 843, time: "15:00" },
    { date: "Sun 6PM", total_nav: 838, time: "18:00" },
  ],
  december: [
    { date: "Mon 9AM", total_nav: 875, time: "09:00" },
    { date: "Mon 12PM", total_nav: 880, time: "12:00" },
    { date: "Mon 3PM", total_nav: 888, time: "15:00" },
    { date: "Mon 6PM", total_nav: 882, time: "18:00" },
    { date: "Tue 9AM", total_nav: 880, time: "09:00" },
    { date: "Tue 12PM", total_nav: 885, time: "12:00" },
    { date: "Tue 3PM", total_nav: 893, time: "15:00" },
    { date: "Tue 6PM", total_nav: 888, time: "18:00" },
    { date: "Wed 9AM", total_nav: 885, time: "09:00" },
    { date: "Wed 12PM", total_nav: 890, time: "12:00" },
    { date: "Wed 3PM", total_nav: 898, time: "15:00" },
    { date: "Wed 6PM", total_nav: 893, time: "18:00" },
    { date: "Thu 9AM", total_nav: 883, time: "09:00" },
    { date: "Thu 12PM", total_nav: 888, time: "12:00" },
    { date: "Thu 3PM", total_nav: 895, time: "15:00" },
    { date: "Thu 6PM", total_nav: 890, time: "18:00" },
    { date: "Fri 9AM", total_nav: 887, time: "09:00" },
    { date: "Fri 12PM", total_nav: 892, time: "12:00" },
    { date: "Fri 3PM", total_nav: 900, time: "15:00" },
    { date: "Fri 6PM", total_nav: 895, time: "18:00" },
    { date: "Sat 9AM", total_nav: 882, time: "09:00" },
    { date: "Sat 12PM", total_nav: 887, time: "12:00" },
    { date: "Sat 3PM", total_nav: 893, time: "15:00" },
    { date: "Sat 6PM", total_nav: 888, time: "18:00" },
    { date: "Sun 9AM", total_nav: 890, time: "09:00" },
    { date: "Sun 12PM", total_nav: 895, time: "12:00" },
    { date: "Sun 3PM", total_nav: 903, time: "15:00" },
    { date: "Sun 6PM", total_nav: 898, time: "18:00" },
  ],
};

const chartConfig = {
  total_nav: {
    label: "Total Nav",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

export default function TotalNavChart({ selected }: { selected: string }) {
  const chartData =
    monthlyData[selected as keyof typeof monthlyData] || monthlyData.january;
  const values = chartData.map((d) => d.total_nav);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);

  // Extract unique weekdays (Mon, Tue, Wed, etc.)
  const uniqueWeekdays = Array.from(
    new Map(
      chartData.map((item) => {
        const day = item.date.split(" ")[0];
        return [day, item];
      })
    ).values()
  ).slice(0, 7);

  const padding = (dataMax - dataMin) * 0.1; // 10% padding
  const minValue = Math.floor(dataMin - padding);
  const maxValue = Math.ceil(dataMax + padding);

  // Generate dynamic ticks
  const tickCount = 5;
  const tickStep = (maxValue - minValue) / (tickCount - 1);
  const dynamicTicks = Array.from({ length: tickCount }, (_, i) =>
    Math.round(minValue + tickStep * i)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltipCursor = (props: any) => {
    const { points, height, payload } = props;

    if (points && points.length > 0) {
      const { x } = points[0];
      const value = payload[0]?.value;

      // Calculate the y position based on the actual chart scaling
      const normalizedValue = (value - minValue) / (maxValue - minValue);
      const yPosition = height - normalizedValue * height;

      return (
        <g>
          {/* Vertical cursor line */}
          <line
            x1={x}
            y1={yPosition}
            x2={x}
            y2={height}
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            strokeDasharray="5 3"
            opacity={0.7}
          />

          {/* Active point circle with glow effect */}
          <circle
            cx={x}
            cy={yPosition}
            r={8}
            fill="var(--color-chart-1)"
            stroke="var(--color-chart-1)"
            strokeWidth={3}
            opacity={1}
            filter="drop-shadow(0 0 6px var(--color-chart-1))"
          />

          {/* Inner circle for contrast */}
          <circle cx={x} cy={yPosition} r={4} fill="white" opacity={1} />
        </g>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-border px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-bold text-foreground">
              ${payload[0].value}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <span className="text-[10px] text-foreground/70">
              {label.split(" ")[0]} {payload[0].payload.time},{" "}
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[230px] w-full mt-6"
      style={{ pointerEvents: "all" }}
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <defs>
          <linearGradient id="fillTotalNav" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-chart-1)"
              stopOpacity={0.5}
            />
            <stop
              offset="95%"
              stopColor="var(--color-chart-1)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          interval={0}
          tickMargin={8}
          height={40}
          ticks={uniqueWeekdays.map((item) => item.date)}
          tickFormatter={(value) => {
            const parts = value.split(" ");
            return parts[0];
          }}
          axisLine={false}
        />
        <YAxis
          ticks={dynamicTicks}
          domain={[minValue, maxValue]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--color-chart-1-foreground)" }}
          tickMargin={10}
          tickFormatter={(value) => `$${value.toFixed(1)}`}
        />
        <ChartTooltip
          content={<CustomTooltipContent />}
          cursor={<CustomTooltipCursor />}
        />
        <Area
          dataKey="total_nav"
          type="monotone"
          fill="url(#fillTotalNav)"
          fillOpacity={0.4}
          stroke="var(--color-chart-1)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
