import React from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { gql, useQuery, useMutation } from "@apollo/client";

const OBTENER_PRODUCTO = gql`
	query ObtenerProducto($id: ID!) {
		obtenerProducto(id: $id) {
			nombre
			precio
			existencia
		}
	}
`;

const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($id: ID!, $input: ProductoInput) {
		actualizarProducto(id: $id, input: $input) {
			id
			nombre
			existencia
			precio
		}
	}
`;

const EditarProducto = () => {
	const router = useRouter();
	const {
		query: { pid },
	} = router;

	// console.log(pid);

	const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
		variables: {
			id: pid,
		},
	});

	const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

	// console.log(data, loading, error);

	const schemaValidation = Yup.object({
		nombre: Yup.string().required("El nombre es obligatorio."),
		existencia: Yup.number()
			.required("La cantidad es obligaria.")
			.positive("Debe ser un numero positivo.")
			.integer("Debe ser un numero entero"),
		precio: Yup.number()
			.required("El precio es obligatorio.")
			.positive("Debe ser un numero positivo."),
	});

	if (loading) return "Cargando...";

    if(!data) return "Accion no permitida";

	const actualizarInfoProdcuto = async (values) => {
		// console.log(values);

		const { nombre, precio, existencia } = values;

		try {
			const { data } = await actualizarProducto({
				variables: {
					id: pid,
					input: { nombre, precio, existencia },
				},
			});

			// console.log(data);

            router.push("/Productos");

            Swal.fire("Correcto!", "Producto actualizado.", "success")
		} catch (error) {
			console.log(error);
		}
	};

	const { obtenerProducto } = data;

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>
			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<Formik
						enableReinitialize
						initialValues={obtenerProducto}
						validationSchema={schemaValidation}
						onSubmit={(values) => {
							actualizarInfoProdcuto(values);
						}}
					>
						{(props) => {
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
											htmlFor="existencia"
										>
											Existencia
										</label>

										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="existencia"
											type="number"
											placeholder="Existencia"
											value={props.values.existencia}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.existencia && props.errors.existencia ? (
										<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{props.errors.existencia}</p>
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
											value={props.values.precio}
											onChange={props.handleChange}
											onBlur={props.handleBlur}
										/>
									</div>

									{props.touched.precio && props.errors.precio ? (
										<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
											<p className="font-bold">Error</p>
											<p>{props.errors.precio}</p>
										</div>
									) : (
										<></>
									)}

									<input
										type="submit"
										className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:cursor-pointer hover:bg-gray-900 font-bold"
										value="Actualizar Producto"
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

export default EditarProducto;
