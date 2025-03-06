"use client";

import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";

import React, { useEffect, useState } from "react";

import { Listarblog } from "./listarblog";
import Tiptap from "./textEdit";
import { BlogApi, Categoria } from "@/interface";
import { toast, Zoom } from "react-toastify";
import { parseCookies } from "nookies";

export const CategoriaGet = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/categorias/show`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default function BlogUsuarioCrear() {
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  const [tema, setTema] = useState("");
  const [url, setUrl] = useState("");
  const [view, setView] = useState("crear");
  const [contenido, setContenido] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCategoria = async () => {
      const data = await CategoriaGet();
      setCategoria(data);
    };
    fetchCategoria();
  }, []); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); 

  const [value, setValue] = React.useState("");
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  const dataApi: BlogApi = {
    idCategoria: selectedKey ? parseInt(selectedKey) : null,
    tema: tema,
    contenido: contenido,
    imagen: url,
    idPsicologo: user?.id ?? null, // Evita error si user aún es null
  };

  const postNewCategoria = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/categorias/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombre: value }),
        }
      );
      const info = await response.json();
      console.log(info);
      setSelectedKey(info.result.idCategoria);
      return info.result.idCategoria; // Devolver el ID
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };
  const handleSubmit = async () => {
    try {
      let categoriaId = selectedKey;
      if (selectedKey === null) {
        categoriaId = await postNewCategoria();
      }
      
      // Ahora usa categoriaId en lugar de selectedKey
      const dataToSend = {
        ...dataApi,
        idCategoria: categoriaId
      };
  
      const cookies = parseCookies();
      const token = cookies["session"];
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/blogs/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
  
      // Resto del código...
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
  
      if (response.ok) {
        console.log("Éxito:", data.description);
      } else {
        if (
          data.errors &&
          data.errors.email &&
          data.errors.email.includes("The email has already been taken.")
        ) {
          toast.warning(
            "El email ya está siendo utilizado por otra cuenta. Por favor, utiliza un email diferente.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: 1,
              theme: "colored",
              transition: Zoom,
            }
          );
        } else {
          toast.warn(
            data.message || "Ha ocurrido un error al procesar tu solicitud.",
            {
              position: "bottom-right",
              autoClose: 1300,
            }
          );
        }
  
        console.error(
          "Error en la solicitud:",
          data.message || "Error desconocido"
        );
        console.error("Detalles:", data.errors || "No hay detalles");
      }
    } catch (error) {
      toast.error("Error de conexión. Por favor, intenta de nuevo más tarde.", {
        position: "top-center",
        autoClose: 1300,
      });
      console.error("Error al enviar al backend:", error);
    }
  };

  return (
    <div>
      <div className="w-full h-16 bg-[#6364F4] items-center justify-start flex">
        <div className="ml-10 flex justify-between items-center w-full max-w-[230px]">
          <Button
            radius="full"
            className="bg-white text-[16px] leading-[20px] text-[#634AE2] font-bold"
            onPress={() => setView("crear")}
          >
            Crear Blog
          </Button>
          <Button
            onPress={() => setView("blogs")}
            className="text-white text-[16px] leading-[20px] bg-[#634AE2] a"
          >
            Ver Blogs
          </Button>
        </div>
      </div>

      {view === "crear" ? (
        <div className="flex  flex-col md:flex-row gap-10 mx-10 mt-14">
          <div className="flex flex-col items-center  w-full max-w-[500px] gap-y-3 mx-auto">
            <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
              Titulo
            </h1>
            <Input
              aria-label="Titulo"
              placeholder="Ingresar Titulo"
              classNames={{
                input: "!text-[#634AE2] ",
              }}
              radius="full"
              height={43}
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            />

            <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
              Categoria
            </h1>
            <div className="flex w-full flex-col">
              <Autocomplete
                radius="full"
                inputProps={{
                  className: "!text-[#634AE2]",
                }}
                allowsCustomValue={true}
                placeholder="Ingresar Categoria"
                defaultItems={categoria}
                aria-label="Categoria"
                variant="faded"
                onInputChange={(value) => setValue(value)}
                onSelectionChange={(value) =>
                  setSelectedKey(value?.toString() || null)
                }
              >
                {(categoria) => (
                  <AutocompleteItem key={categoria.idCategoria}>
                    {categoria.nombre}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
              URL Imagen
            </h1>
            <Input
              placeholder="Url de imagen"
              classNames={{
                input: "!text-[#634AE2]",
              }}
              radius="full"
              height={43}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="w-full  max-w-full md:max-w-[50%] ">
            <h1 className="h-10 bg-[#6364F4]  w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
              Descripción
            </h1>
            <div className="py-4 w-full">
              <Tiptap setContenido={setContenido} />
              <div className=" flex pt-4 justify-center md:justify-end">
                <Button
                  onClick={handleSubmit}
                  radius="full"
                  className="text-white bg-[#634AE2]  w-full max-w-32 font-normal text-sm"
                >
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-10 mt-14">
          <Listarblog />
        </div>
      )}
    </div>
  );
}