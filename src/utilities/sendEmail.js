import emailjs from "emailjs-com";

export const sendEmailToClient = (data) => {
  return emailjs
    .send(
      "service_yh7vnoo",
      "template_ch32eud",
      {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        issue: data.issue,
        message: data.message,
        to_email: data.email,
      },
      "kUYw-4S2kLPCi75ci"
    )
    .then(
      (response) => {
        console.log("Corre enviado con exito", response.status, response.text);
      },
      (error) => {
        console.log("fallo al enviar el mail", error);
      }
    );
};

export const sendEmailToRestaurant = (data) => {
  return emailjs
    .send(
      "service_yh7vnoo",
      "template_ch32eud",
      {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        issue: data.issue,
        message: data.message,
        to_email: "Lacerveceriatucu@gmail.com",
      },
      "kUYw-4S2kLPCi75ci"
    )
    .then(
      (response) => {
        console.log("Corre enviado con exito", response.status, response.text);
      },
      (error) => {
        console.log("fallo al enviar el mail", error);
      }
    );
};