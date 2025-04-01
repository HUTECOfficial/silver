"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Thank you for your message. We'll get back to you soon!")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="text-4xl font-bold text-center mb-8" variants={itemVariants}>
          Get in Touch
        </motion.h1>
        <motion.p className="text-center text-gray-600 mb-12" variants={itemVariants}>
          We'd love to hear from you, whether you have a question about our products, shipping, or anything else, we're
          more than happy to help.
        </motion.p>

        <motion.div className="grid md:grid-cols-2 gap-12" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              <strong>Phone:</strong> (954) 525-0073
            </p>
            <p className="mb-4">
              <strong>Email:</strong> Sales@silverstreetjewelry.com
            </p>
            <p className="mb-4">
              <strong>Hours:</strong> Monday - Friday: 9am - 6pm
            </p>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required className="min-h-[150px]" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>

        <motion.div
          className="mt-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Visit Our Store</h2>
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              We'd love to see you in person! Visit our flagship store in Fort Lauderdale, FL.
            </p>
            <p className="text-gray-600">
              Store Hours: Monday - Friday: 9am - 6pm, Saturday: 10am - 5pm, Sunday: Closed
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

