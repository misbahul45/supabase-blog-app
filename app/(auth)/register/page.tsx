'use client'
import { createUser } from '@/actions/user-action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormStatus } from '@/hooks/useFormStatus'
import { sleep } from '@/lib/utils'
import UserSchema from '@/schema/user-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeClosed, EyeIcon, Loader2, Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

type UserRegisterSchemaType = z.infer<typeof UserSchema.UserRegisterSchema>;

const page = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  
  const router = useRouter()
  const { loading, success, error, setLoading, setSuccess, setError } = useFormStatus();

  const form = useForm<z.infer<typeof UserSchema.UserRegisterSchema>>({
    mode: 'onChange',
    resolver: zodResolver(UserSchema.UserRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit: SubmitHandler<UserRegisterSchemaType> = async (values) => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      await sleep()
      await createUser(values)
      setSuccess(true);
      form.reset()
      toast.success('Registration successful!');
      router.push('/login')
    } catch (e) {
      setError(e as Error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='min-h-screen flex md:flex-row flex-col bg-gradient-to-r from-cyan-500 to-green-500'> 
      <div className='relative flex-1 px-4 flex flex-col justify-center items-center'>
        <h1 className='text-center font-bold text-blue-800 text-2xl mb-2'>Mari Bergandengan Tangan untuk Dunia yang Lebih Nyaman dan Bermakna!</h1>
        <Image src="/logo.png" alt="Logo" width={300} height={300} className='block mx-auto' />
        <div className='w-full'>
          <p className='text-sm text-white text-center'>
            Mari bersama menciptakan dunia yang lebih nyaman dan bermakna! Dengan langkah-langkah kecil, kita bisa membawa perubahan positif untuk lingkungan dan sesama. Bergabunglah untuk mewujudkan masa depan yang lebih baik bagi kita semua! 🌍
          </p>
        </div>  
        <p className='text-white text-xs absolute left-1/2 -translate-x-1/2 bottom-4 whitespace-nowrap'>Dengan Registrasi Anda, Anda menyetujui ketentuan dan syarat-syarat yang berlaku</p>
      </div>  
      <div className='flex-1  grid place-items-center'>
        <div className='w-full max-w-sm mx-auto p-4 rounded-lg shadow-xl shadow-slate-700/70 bg-white'>
          <h2 className='text-cyan-400 text-2xl font-semibold text-center'>Register</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl className='relative'>
                      <div className='relative'>
                        <Input placeholder="Input your username" {...field} className='pl-8 peer' />
                        <User className={`absolute top-1/2 -translate-y-1/2 left-1 h-4 ${field.value === '' ? "text-slate-400" : "text-black"} peer-focus:text-black`} />
                      </div>
                    </FormControl>
                    {form.formState.errors.username && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder="Input your email" {...field} className='pl-8 peer' />
                        <Mail className={`absolute top-1/2 -translate-y-1/2 left-1 h-4 ${field.value === '' ? "text-slate-400" : "text-black"} peer-focus:text-black`} />
                      </div>
                    </FormControl>
                    {form.formState.errors.email && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder="Input your password" {...field} type={showPassword ? "text" : "password"} className='pl-8 peer' />
                        <Lock className={`absolute top-1/2 -translate-y-1/2 left-1 h-4 ${field.value === '' ? "text-slate-400" : "text-black"} peer-focus:text-black`} />
                        <button type="button" className={`absolute top-1/2 -translate-y-1/2 right-1 h-4 ${showPassword ? "text-black" : "text-slate-400"} peer-focus:text-black`} onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeIcon /> : <EyeClosed />}
                        </button>
                      </div>
                    </FormControl>
                    {form.formState.errors.password && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input placeholder="Input your confirm password" {...field} type={showConfirmPassword ? "text" : "password"} className='pl-8 peer' />
                        <Lock className={`absolute top-1/2 -translate-y-1/2 left-1 h-4 ${field.value === '' ? "text-slate-400" : "text-black"} peer-focus:text-black`} />
                        <button type="button" className={`absolute top-1/2 -translate-y-1/2 right-1 h-4 ${showConfirmPassword ? "text-black" : "text-slate-400"} peer-focus:text-black`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <EyeIcon /> : <EyeClosed />}
                        </button>
                      </div>
                    </FormControl>
                    {form.formState.errors.confirmPassword && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className='w-full flex justify-center bg-blue-600 hover:bg-blue-700'>
                {loading ? <Loader2 className='w-6 h-6 animate-spin' /> : "Create Account"}
              </Button>
            </form>
          </Form>
          <p className='mt-4 text-center'>Already have an account? <span className='text-blue-600 hover:underline cursor-pointer' onClick={() => router.push('/login')}>Login</span></p>
        </div>
      </div>
    </section>
  )
}

export default page
