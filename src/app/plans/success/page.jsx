import { stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-100 transition-all">
          
          {/* Animated/Beautiful Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-6">
            <svg 
              className="h-8 w-8 text-emerald-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2.5" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Payment Successful!
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            Thank you for your order. Your account has been upgraded.
          </p>

          <hr className="border-slate-100 my-4" />

          {/* Details Box */}
          <div className="bg-slate-50 rounded-xl p-4 text-left mb-6 text-sm">
            <p className="text-slate-600 mb-2 leading-relaxed">
              We appreciate your business! A confirmation email and invoice will be sent to:{' '}
              <strong className="text-slate-900 break-all">{customerEmail}</strong>.
            </p>
            <p className="text-slate-500 text-xs mt-3">
              Have questions? Reach out to us at{' '}
              <a 
                href="mailto:orders@example.com" 
                className="text-emerald-600 hover:text-emerald-700 font-medium underline underline-offset-2"
              >
                orders@example.com
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="w-full inline-flex justify-center items-center px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-emerald-200"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="w-full inline-flex justify-center items-center px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl border border-slate-200 transition-colors"
            >
              Back Home
            </Link>
          </div>

        </div>
      </section>
    )
  }
}