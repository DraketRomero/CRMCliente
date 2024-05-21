import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVO_CLIENTE = gql`
	mutation nuevoCliente($input: ClienteInput) {
		nuevoCliente(input: $input) {
			id
			nombre
			apellido
			empresa
			email
			telefono
		}
	}
`;

const OBTENER_CLIENTES_USUARIO = gql`
	query obtenerClientesVendedor {
		obtenerClientesVendedor {
			nombre
			apellido
			empresa
			email
		}
	}
`;

const NuevoCliente = () => {
	const router = useRouter();
	const [mensaje, setMensaje] = useState(null);

	// Mutation para crear nuevos clientes
	const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
		update(cache, { data: { nuevoCliente } }) {
			// Obtener el objeto de cache que deseamos actualizar
			const { obtenerClientesVendedor } = cache.readQuery({
				query: OBTENER_CLIENTES_USUARIO,
			});

			// Reescribimos el cache ( EL CACHE NUNCA SE DEBE MODIFICAR )
			cache.writeQuery({
				query: OBTENER_CLIENTES_USUARIO,
				data: {
					obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
				},
			});
		},
	});

	const formik = useFormik({
		initialValues: {
			nombre: "",
			apellido: "",
			empresa: "",
			email: "",
			telefono: "",
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required("El nombre es obligatorio"),
			apellido: Yup.string().required("El apellido es obligatorio"),
			empresa: Yup.string().required("La empresa es obligatoria."),
			email: Yup.string()
				.email("El email no es valido.")
				.required("El email no puede ir vacio."),
		}),
		onSubmit: async (valores) => {
			console.log(valores);

			try {
				const { data } = await nuevoCliente({
					variables: {
						input: valores,
					},
				});

				router.push("/");
			} catch (error) {
				setMensaje(error.message.replace("GraphQL error: ", ""));

				setTimeout(() => {
					setMensaje(null);
				}, 2000);
			}
		},
	});

	const mostrarMensaje = () => {
		return (
			<div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
				<p>{mensaje}</p>
			</div>
		);
	};

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
			{mensaje && mostrarMensaje()}

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
								htmlFor="apellido"
							>
								Apellido
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="apellido"
								type="text"
								placeholder="Apellido"
								value={formik.values.apellido}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.apellido && formik.errors.apellido ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.apellido}</p>
							</div>
						) : (
							<></>
						)}

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="empresa"
							>
								Empresa
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="empresa"
								type="text"
								placeholder="Empresa"
								value={formik.values.empresa}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.empresa && formik.errors.empresa ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.empresa}</p>
							</div>
						) : (
							<></>
						)}

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="email"
							>
								Email
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="Email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						{formik.touched.email && formik.errors.email ? (
							<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
								<p className="font-bold">Error</p>
								<p>{formik.errors.email}</p>
							</div>
						) : (
							<></>
						)}

						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="telefono"
							>
								Telefono
							</label>

							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="telefono"
								type="tel"
								placeholder="Telefono"
								value={formik.values.telefono}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>

						<input
							type="submit"
							className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 font-bold"
							value="Registrar Cliente"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default NuevoCliente;
