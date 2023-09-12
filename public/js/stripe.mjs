/* eslint-disable */
import { showAlert } from './alerts.mjs';

const stripe = Stripe(
  'pk_test_51NfkjqFOx37dgf6yGi4KzOD62Cxj2CG0yOHFlWLaFJrm4ZKMB0Ja6Eb4ecxVmq0x8Uo7imt8iUDBvjtiQxj2i1o500QdvBGh74'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
