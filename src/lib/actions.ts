'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
    photo?: string[];
  };
  message: string | null;
};

// Schema for text fields
const FormSchema = z.object({
  name: z.string().min(2, { message: 'Per favore, inserisci il tuo nome.' }),
  email: z.string().email({ message: 'Per favore, inserisci un indirizzo email valido.' }),
  subject: z.string().min(1, { message: 'Per favore, inserisci un oggetto.' }),
  message: z.string().min(10, { message: 'Per favore, inserisci un messaggio più dettagliato.' }),
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function sendConfirmationEmail(prevState: State | undefined, formData: FormData): Promise<State> {
  // Validate text fields
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'error: Campi mancanti. Impossibile inviare il messaggio.',
    };
  }

  const { name, email, subject, message } = validatedFields.data;
  
  // Handle file upload separately
  const photo = formData.get('photo') as File | null;
  const attachments = [];
  
  if (photo && photo instanceof File && photo.size > 0) {
    try {
      const buffer = Buffer.from(await photo.arrayBuffer());
      attachments.push({
        filename: photo.name,
        content: buffer,
        contentType: photo.type,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      return { message: 'error: Impossibile elaborare il file allegato.' };
    }
  }
  
  const requestId = `REQ-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  const labMailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: 'laboratorio.ticino@gmail.com',
    subject: `[${requestId}] Nuova richiesta da ${name}: ${subject}`,
    html: `
      <p><strong>ID Richiesta:</strong> ${requestId}</p>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Oggetto:</strong> ${subject}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      ${attachments.length > 0 ? '<p><strong>Allegato presente.</strong></p>' : ''}
    `,
    attachments: attachments,
  };
  
  const userMailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: `Conferma della tua richiesta a GDC [${requestId}]`,
    html: `
      <h1>Grazie per averci contattato, ${name}!</h1>
      <p>Abbiamo ricevuto la tua richiesta e ti risponderemo il prima possibile.</p>
      <p>Il tuo ID di riferimento è: <strong>${requestId}</strong>. Conservalo per future comunicazioni.</p>
      <hr>
      <p><strong>Riepilogo della tua richiesta:</strong></p>
      <p><strong>Oggetto:</strong> ${subject}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${message.substring(0, 200).replace(/\n/g, '<br>')}${message.length > 200 ? '...' : ''}</p>
      <br>
      <p>Cordiali saluti,</p>
      <p><strong>GDC Jewellery Lab</strong></p>
    `,
  };

  try {
    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
        console.error('Le credenziali Gmail non sono configurate nel file .env');
        return { message: 'error: Il server di posta non è configurato.' };
    }
    
    await transporter.sendMail(labMailOptions);
    await transporter.sendMail(userMailOptions);
    
    return { message: 'success: Emails sent' };
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
    return { message: `error: Si è verificato un problema durante l'invio dell'email.` };
  }
}
