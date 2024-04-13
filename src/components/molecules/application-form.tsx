"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface AplicationFormProps {
  handleSubmit: () => void
}

const formSchema = z.object({
  jobPosition: z.string().min(1, {
    message: "El puesto de trabajo es requerido",
  }).max(50, {
    message: "El puesto de trabajo debe ser menor a 50 caracteres",
  })
})

const AplicationForm: React.FC<AplicationFormProps> = ({ handleSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobPosition: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="jobPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto de trabajo</FormLabel>
              <FormControl>
                <Input placeholder="Puesto de trabajo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}

export default AplicationForm