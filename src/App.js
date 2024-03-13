import React, { useState } from "react";

function App() {
  const [nombre, setNombre] = useState(""); // Estado para el nombre del usuario
  const [edad, setEdad] = useState(""); // Estado para la edad del usuario
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de bienvenida
  const [mostrarToast, setMostrarToast] = useState(false); // Estado para la visibilidad del toast
  const [mensajeToast, setMensajeToast] = useState(""); // Estado para el mensaje del toast

  // Función para mostrar el toast
  const displayToast = (message) => {
    setMensajeToast(message); // Establece el mensaje del toast
    setMostrarToast(true); // Muestra el toast
    setTimeout(() => {
      setMostrarToast(false); // Oculta el toast después de 3 segundos
      // Limpia los campos después de que el toast desaparece
      setNombre(""); // Limpia el campo nombre
      setEdad(""); // Limpia el campo edad
    }, 3000);
  };

  // Actualiza este estado solo con caracteres no numéricos
  const handleNombreChange = (e) => {
    const valor = e.target.value;
    // La expresión regular verifica que no haya números en la entrada
    if (/^[a-zA-Z ]*$/.test(valor)) {
      setNombre(valor);
    }
  };

  // Función para generar el mensaje de bienvenida y mostrar el toast
  const generarMensaje = () => {
    let mensajeBienvenida = "";
    if (edad < 18) {
      mensajeBienvenida = `Hola ${nombre}, eres muy joven para entrar a los suburbios perdidos!!`;
    } else {
      mensajeBienvenida = `Bienvenido ${nombre}, gracias! ya puedes entrar a la perdición sin retorno!`;
    }
    setMensaje(mensajeBienvenida); // Establece el mensaje de bienvenida
    displayToast(mensajeBienvenida); // Muestra el mensaje en un toast
  };
  // Renderizamos el formulario y el mensaje en la UI.
  return (
    <div className="container">
      <div className="card">
        {/* El formulario para recoger el nombre y la edad del usuario. */}
        {/* Cuando el formulario se envía, se previene la acción por defecto del navegador usando e.preventDefault().
          Luego, se llama a setMensaje para actualizar el estado 'mensaje' con el valor retornado por generarMensaje(). */}
        <form
          className="myform"
          onSubmit={(e) => {
            e.preventDefault(); // Evita el comportamiento por defecto del formulario
            generarMensaje(); // Genera y muestra el mensaje de bienvenida y el toast
          }}
        >
          <label htmlFor="nombre">Nombre Completo</label>
          {/* Input para el nombre del usuario. Cada vez que cambie, setNombre actualizará el estado 'nombre'. */}
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Ingrese su nombre"
            required
          ></input>
          <label htmlFor="correo">Edad</label>
          {/* Input para la edad del usuario. Cada vez que cambie, setEdad actualizará el estado 'edad'. */}
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Ingrese su edad"
            required
          ></input>
          {/* Botón para enviar el formulario */}
          <button type="submit">Enviar</button>
        </form>
      </div>
      {/* Toast */}
      <div className={`toast ${mostrarToast ? "show" : ""}`}>
        {mensajeToast}
      </div>
    </div>
  );
} /* App function's end */

// Exportamos App para que pueda ser usado en otros archivos.
export default App;
