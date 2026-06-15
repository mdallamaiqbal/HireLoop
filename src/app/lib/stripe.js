import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID ={
    'seeker_pro' : 'price_1TiazgIekOo4iKWESsgdub6V',
    'seeker_premium' : 'price_1Tic1QIekOo4iKWE8tMUGOtR',
    'recruiter_growth' : 'price_1Tic3zIekOo4iKWEndgONf04',
    'recruiter_enterprise' :'price_1Tic5gIekOo4iKWEZru5F0LX',
}