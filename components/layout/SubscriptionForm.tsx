"use client"

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

const SubscriptionForm = () => {
  const t = useTranslations()

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('FormErrors.nameRequired'))
      .min(2, t('FormErrors.nameTooShort')),
    email: Yup.string()
      .email(t('FormErrors.invalidEmail'))
      .required(t('FormErrors.emailRequired'))
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log('Submitting:', values)
        const response = await fetch('http://localhost:1337/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_SUBSCRIBER_TOKEN}`
          },
          body: JSON.stringify({
            data: {
              ...values,
              locale: 'en' // Default locale
            }
          })
        })
        console.log('Response status:', response.status)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('Submission error:', errorData)
          
          if (response.status === 400 && errorData.error?.message?.includes('unique')) {
            throw new Error('DUPLICATE_EMAIL')
          }
          throw new Error(errorData.message || 'Submission failed')
        }
        const result = await response.json()
        console.log('Submission success:', result)

        toast.success(t('FormMessages.success'))
        // Only reset name field while keeping email
        formik.setFieldValue('name', '')
      } catch (error) {
        if (error instanceof Error && error.message === 'DUPLICATE_EMAIL') {
          toast.error(t('FormMessages.duplicateEmail'))
        } else {
          toast.error(t('FormMessages.error'))
        }
        console.error('Submission error:', error)
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (
    <>
        <form onSubmit={formik.handleSubmit} className="flex items-stretch bg-white rounded-lg overflow-hidden w-full min-w-[300px] max-w-[500px] h-[42px]">
        <input
          type="text"
          name="name"
          placeholder={t('Footer.namePlaceholder')}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none flex-1 rounded-l-lg min-w-[120px] h-full"
        />
        <div className="h-full w-px bg-gray-300"></div>
        <input
          type="email"
          name="email"
          placeholder={t('Footer.emailPlaceholder')}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none flex-1 border-l border-gray-300 min-w-[120px] h-full"
        />
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-4 py-1.5 text-white font-medium hover:bg-opacity-80 transition-colors rounded-lg m-1 w-[100px] h-[38px] self-center"
          style={{ backgroundColor: "#643F2E" }}
        >
          {formik.isSubmitting ? t('Footer.submitting') : t('Footer.subscribe')}
        </button>
      </form>
      <div className="border-t border-gray-200 my-2"></div>
      {(formik.touched.name && formik.errors.name) || (formik.touched.email && formik.errors.email) ? (
        <div className="text-red-500 text-xs mt-2">
          {formik.errors.name || formik.errors.email}
        </div>
      ) : null}
    </>
  )
}

export default SubscriptionForm
