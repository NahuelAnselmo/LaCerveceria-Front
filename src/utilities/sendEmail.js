import emailjs from "emailjs-com";

export const sendEmailToClient = (data) => {
  return emailjs
    .send(
      "service_jfcaxoe",
      "template_ho4rd9v",
      {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        issue: data.issue,
        message: data.message,
        to_email: data.email,
      },
      "VaOMmTVQfY_WO-5KA"
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
      "service_jfcaxoe",
      "template_ho4rd9v",
      {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        issue: data.issue,
        message: data.message,
        to_email: "ExilirAndBite@gmail.com",
      },
      "VaOMmTVQfY_WO-5KA"
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