import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

const OBTENER_PRODUCTOS = gql`
	query ObtenerProductos {
		obtenerProductos {
			id
			nombre
			precio
			existencia
		}
	}
`;

const NuevoProducto = () => {
    const router = useRouter();
    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, { data: { nuevoProducto }}){
            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            })
        }
    });

    const formik = useFormik({ 
        initialValues: {
            nombre: "",
            existencia: "",
            precio: ""
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required("El nombre es obligatorio."),
            existencia: Yup.number().required("La cantidad es obligaria.").positive("Debe ser un numero positivo.").integer("Debe ser un numero entero"),
            precio: Yup.number().required("El precio es obligatorio.").positive("Debe ser un numero positivo.")
        }),
        onSubmit: async values => {

            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input: values
                    }
                });

                Swal.fire("Agregado!", "Producto agregado correctamente.", "success");

                router.push("/Productos");

                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    })

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<form
						className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
						onSubmit={formik.handleSubmit}
					>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="nombre"
							>
								Nombre
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="nombre"
								type="text"
								placeholder="Nombre"
								value={formik.values.nombre}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.nombre && formik.errors.nombre ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.nombre}</p>
							</div>
						) : (
							<></>
						)}

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="existencia"
							>
								Existencia
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="existencia"
								type="number"
								placeholder="Existencia"
								value={formik.values.existencia}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.existencia && formik.errors.existencia ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.existencia}</p>
							</div>
						) : (
							<></>
						)}

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="precio"
							>
								Precio
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="precio"
								type="number"
								placeholder="Precio"
								value={formik.values.empresa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

                        {formik.touched.precio && formik.errors.precio ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.precio}</p>
							</div>
						) : (
							<></>
						)}

						<input
							type="submit"
							className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 font-bold"
							value="Registrar Producto"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default NuevoProducto;
