"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, GitBranch, MapPin, Send, Loader2, CheckCircle, AlertCircle, Zap, Code, Brain } from "lucide-react";
import { LinkedInIcon, TwitterIcon } from "@/components/common/social-icons";
import { personalInfo, socialLinks } from "@/lib/data";
import { toast } from "@/components/ui/toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        toast({
          title: "Message sent!",
          description: "I'll get back to you as soon as possible.",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      setSubmitStatus("error");
      toast({
        title: "Something went wrong",
        description: "Please try again later or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 mb-4">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Let&apos;s work <span className="text-primary">together</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form and I&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-red-500" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-red-500" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Project inquiry / Collaboration / Just saying hi"
                      {...register("subject")}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-sm text-red-500" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      rows={6}
                      {...register("message")}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-500" role="alert">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                    {submitStatus === "success" && <CheckCircle className="mr-2 h-4 w-4" aria-hidden="true" />}
                    {submitStatus === "error" && <AlertCircle className="mr-2 h-4 w-4" aria-hidden="true" />}
                    {isSubmitting
                      ? "Sending..."
                      : submitStatus === "success"
                      ? "Message Sent!"
                      : submitStatus === "error"
                      ? "Failed - Try Again"
                      : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Other Ways to Connect</CardTitle>
                <CardDescription>
                  Prefer a different way? Reach out through these channels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Email", href: `mailto:${personalInfo.email}`, icon: Mail, desc: "Best for project inquiries" },
                    { name: "GitHub", href: socialLinks[0].url, icon: GitBranch, desc: "View my code & contributions" },
                    { name: "LinkedIn", href: socialLinks[1].url, icon: LinkedInIcon, desc: "Professional networking" },
                    { name: "Twitter", href: socialLinks[2].url, icon: TwitterIcon, desc: "Follow my thoughts & updates" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Let&apos;s Build Something</CardTitle>
                <CardDescription>
                  I&apos;m always open to discussing new opportunities, interesting projects, or just chatting about tech.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Fast Response</h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                        I typically respond within 24 hours. For urgent matters, email is best.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Code className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Open Source</h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                        Love contributing to OSS. Check out my GitHub for projects and contributions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">AI & ML Projects</h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                        Especially interested in RAG systems, LLM applications, and AI-powered products.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Location</h3>
                      <p className="text-neutral-600 dark:text-neutral-300 mt-1">
                        Based in {personalInfo.location}, open to remote work worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                    &ldquo;The best way to predict the future is to build it.&rdquo;
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}