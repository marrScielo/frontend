"use client";

import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Listarblog } from "./listarblog";
import Tiptap from "./textEdit";
import { BlogApi, Categoria, UsuarioLocalStorage } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "../ToastStyle";

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

export const BlogById = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/blogs/show/${id}`,
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
    console.error("Error fetching blog by ID:", error);
    return null;
  }
};

export default function BlogUsuarioCrear() {
  const [categoria, setCategoria] = useState<Categoria[]>([]);
  const [tema, setTema] = useState("");
  const [url, setUrl] = useState("");
  const [view, setView] = useState("crear");
  const [contenido, setContenido] = useState("");
  const [user, setUser] = useState<UsuarioLocalStorage | null>(null);
  const [value, setValue] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [originalIdPsicologo, setOriginalIdPsicologo] = useState<number | null>(null); 

  useEffect(() => {
    const fetchCategoria = async () => {
      const data = await CategoriaGet();
      setCategoria(data);
    };
    fetchCategoria();
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);

  const dataApi: BlogApi = {
    idCategoria: selectedKey ? parseInt(selectedKey) : null,
    tema: tema,
    contenido: contenido,
    imagen: url,
    idPsicologo: originalIdPsicologo ?? user?.id ?? null, 
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
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nombre: value }),
        }
      );
      const info = await response.json();
      setSelectedKey(info.result.idCategoria);
      return info.result.idCategoria;
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

      const dataToSend = {
        ...dataApi,
        idCategoria: categoriaId,
      };

      const cookies = parseCookies();
      const token = cookies["session"];

      const url = editingBlogId
        ? `${process.env.NEXT_PUBLIC_API_URL}api/blogs/update/${editingBlogId}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/blogs/create`;

      const method = editingBlogId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(
          "success",
          editingBlogId
            ? "Publicación actualizada correctamente"
            : "Publicación creada correctamente"
        );
        await new Promise((resolve) => setTimeout(resolve, 2600));
        window.location.reload();
      } else {
        showToast("error", data.description || "Error desconocido");
 

      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error de conexión. Intenta nuevamente.");
    }
  };

  const handleEdit = async (id: number) => {
    const blog = await BlogById(id);
    if (blog) {
      setTema(blog.tema);
      setUrl(blog.imagen);
      setContenido(blog.contenido);
      setSelectedKey(blog.idCategoria.toString());
      setEditingBlogId(blog.idBlog);
      setOriginalIdPsicologo(blog.idPsicologo); 
      setView("crear");
    }
  };

  return (
    <div>
      <div className="w-full h-16 bg-[#6364F4] items-center justify-start flex">
        <div className="ml-10 flex justify-between items-center w-full max-w-[230px]">
          <Button
            radius="full"
            className="bg-white text-[16px] leading-[20px] text-[#634AE2] font-bold"
            onPress={() => {
              setView("crear");
              setEditingBlogId(null); 
              setOriginalIdPsicologo(null); 
            }}
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
        <div className="flex flex-col md:flex-row gap-10 mx-10 mt-14">
          <div className="flex flex-col items-center w-full max-w-[500px] gap-y-3 mx-auto">
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
                selectedKey={selectedKey}
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

          <div className="w-full max-w-full md:max-w-[50%]">
            <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
              Descripción
            </h1>
            <div className="py-4 w-full">
              <Tiptap setContenido={setContenido} contenido={contenido} />
              <div className="flex pt-4 justify-center md:justify-end">
                <Button
                  onClick={handleSubmit}
                  radius="full"
                  className="text-white bg-[#634AE2] w-full max-w-32 font-normal text-sm"
                >
                  {editingBlogId ? "Actualizar" : "Enviar"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-10 mt-14">
          <Listarblog onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
}