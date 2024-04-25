"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { sections } from '@/lib/consts'
import { Application } from '@/types'

interface AplicationFormProps {
  application?: Application
  isLoading?: boolean
  handleSubmit: (application: Application) => void
}

const formSchema = z.object({
  jobPosition: z.string().min(1, {
    message: "El puesto de trabajo es requerido",
  }).max(50, {
    message: "El puesto de trabajo debe tener menos de 40 caracteres",
  }),
  company: z.string().min(1, {
    message: "La empresa es requerida",
  }).max(50, {
    message: "La empresa debe tener menos de 40 caracteres",
  }),
  jobType: z.string().min(1, {
    message: "El tipo de trabajo es requerido",
  }),
  column: z.string().min(1, {
    message: "La sección es requerida",
  }),
  salary: z.string().max(20, {
    message: "La empresa debe tener menos de 10 caracteres",
  }).optional(),
  url: z.string().optional()
})

const AplicationForm: React.FC<AplicationFormProps> = ({ application, isLoading, handleSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobPosition: application?.jobPosition || "",
      company: application?.company || "",
      url: application?.url || "",
      salary: application?.salary?.toString() || "",
      jobType: application?.jobType || "",
      column: application?.column.toString() || ""
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSubmit({
      ...values,
      id: application?.id
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
        <FormField
          control={form.control}
          name="jobPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto de trabajo*</FormLabel>
              <FormControl>
                <Input placeholder="Puesto de trabajo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa*</FormLabel>
              <FormControl>
                <Input placeholder="Empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Trabajo*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger >
                    <SelectValue placeholder="Selecciona un tipo de trabajo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Presencial">Presencial</SelectItem>
                  <SelectItem value="Híbrido">Híbrido</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="column"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Columna*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger >
                    <SelectValue placeholder="Selecciona una columna" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    sections.map((section, index) => (
                      <SelectItem key={index} value={section.id.toString()}>{section.title}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salario</FormLabel>
              <FormControl>
                <Input placeholder="Salario" type='number' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Url" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className='mt-2' type="submit">Guardar</Button>
      </form>
    </Form>
  )
}

export default AplicationForm