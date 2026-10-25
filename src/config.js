// Everything a non-developer may need to change lives here.

export const RESTAURANT = {
  name: 'Bites of Paradise',
  tagline: 'One taste and you keep coming back.',
  city: 'Kano, Nigeria',
  timeZone: 'Africa/Lagos',

  // WhatsApp number in international format, digits only (e.g. '2348012345678').
  // When set, orders and table requests are sent straight to this number.
  // When empty, customers get a "Copy" button and the phone link is hidden.
  whatsapp: '',
  phone: '', // display format, e.g. '+234 801 234 5678'
  email: '',
  instagram: '', // handle without @

  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.778894532748!2d8.539579814325924!3d11.989795638903932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8108556d09b7%3A0x29c4b1806c5a19ce!2sBites%20of%20paradise!5e0!3m2!1sen!2sng!4v1677264663563!5m2!1sen!2sng',
  directions: 'https://www.google.com/maps/search/?api=1&query=Bites+of+Paradise+Kano',
}

// 0 = Sunday … 6 = Saturday. Times are 24h, local to Kano.
export const HOURS = [
  { day: 0, label: 'Sunday', open: '08:00', close: '22:00' },
  { day: 1, label: 'Monday', open: '08:00', close: '22:00' },
  { day: 2, label: 'Tuesday', open: '08:00', close: '22:00' },
  { day: 3, label: 'Wednesday', open: '08:00', close: '22:00' },
  { day: 4, label: 'Thursday', open: '08:00', close: '22:00' },
  { day: 5, label: 'Friday', open: '08:00', close: '22:00' },
  { day: 6, label: 'Saturday', open: '08:00', close: '23:00' },
]

// Last table we accept before closing, in minutes.
export const LAST_SEATING_BEFORE_CLOSE = 60

// Top-of-site announcement. Set enabled: false to hide it.
export const PROMO = {
  enabled: false,
  text: '30% off this weekend when you book a table',
  to: '/reserve',
}
