import React from "react";
import { useRouter } from "next/router";
import { Layout } from "./../../components/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const OBTENER_CLIENTE = gql`
	query obtenerCliente($id: ID!) {
		obtenerCliente(id: $id) {
			nombre
			apellido
			email
			telefono
			empresa
		}
	}
`;

const ACTUALIZAR_CLIENTE = gql`
	mutation actualizarCliente($id: ID!, $input: ClienteInput) {
		actualizarCliente(id: $id, input: $input) {
			nombre
			email
		}
	}
`;

const EditarCliente = () => {
	// Obtenemos la infromacion del id seleccionado
	const router = useRouter();
	const {
		query: { pid },
	} = router;
	// console.log(pid);

	// Consultar el cliente actual
	const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
		variables: {
			id: pid,
		},
	});

	// Actualizar datos del cliente
	const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

	const schemaValidation = Yup.object({
		nombre: Yup.string().required("El nombre es obligatorio"),
		apellido: Yup.string().required("El apellido es obligatorio"),
		empresa: Yup.string().required("La empresa es obligatoria."),
		email: Yup.string()
			.email("El email no es valido.")
			.required("El email no puede ir vacio."),
	});

	if (loading) return "Cargando...";
	// console.log(data, loading, error);

	const { obtenerCliente } = data;

	// Modifica los datos del cliente en la bd
	const updateDataCliente = async (valores) => {
		const { nombre, apellido, empresa, email, telefono } = valores;
		
		try {
			const { data } = await actualizarCliente({
				variables: {
					id: pid,
					input: { nombre, apellido, empresa, email, telefono }
				}
			});

			// TODO: Redireccionar al usuario
			router.push("/");
			Swal.fire("Actualizado!", "Cliente actualizado correctamente", "success");
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<Formik
						validationSchema={schemaValidation}
						enableReinitialize
						initialValues={obtenerCliente}
						onSubmit={(valores) => {
							updateDataCliente(valores)
						}}
					>
						{(props) => {
							// console.log(props);

							return (
								<form
									className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
									onSubmit={props.handleSubmit}
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
											value={props.values.nombre}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.nombre && props.errors.nombre ? (
										<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{props.errors.nombre}</p>
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
											value={props.values.apellido}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.apellido && props.errors.apellido ? (
										<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{props.errors.apellido}</p>
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
											value={props.values.empresa}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.empresa && props.errors.empresa ? (
										<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{props.errors.empresa}</p>
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
											value={props.values.email}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.email && props.errors.email ? (
										<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{props.errors.email}</p>
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
											value={props.values.telefono}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									<input
										type="submit"
										className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 font-bold"
										value="Editar Cliente"
									/>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditarCliente;
