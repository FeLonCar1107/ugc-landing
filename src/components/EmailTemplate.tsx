import { IEmailTemplateProps } from "@/types/props/email-template";

export default function EmailTemplate(props: IEmailTemplateProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-[1000px] flex flex-col justify-start p-4 bg-white">
        <h1 className="font-BeckanPersonal text-center text-jazzberry-jam-500 uppercase text-[5vw]">
          Isabella
        </h1>
        <p className="text-center text-lg">
          ¡Hola Isabella! Has recibido un nuevo mensaje a través de tu
          portafolio.
        </p>
        <div className="mt-6">
          <p className="mb-2">
            <strong>De:</strong> {props.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {props.email}
          </p>
          <p className="mb-2">
            <strong>Mensaje:</strong> {props.message}
          </p>
        </div>
        <p className="text-center text-base mt-6 text-gray-400">
          Este mensaje fue enviado desde tu portafolio. Para responder, por
          favor utiliza la dirección de correo proporcionada.
        </p>
      </div>
    </div>
  );
}
