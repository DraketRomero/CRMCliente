import React from "react";
import { Layout } from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { Producto } from "../components/Producto";
import Link from "next/link";

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

const Productos = () => {
	const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

	// console.log(data, loading, error);

	if (loading) return "Cargando...";

	return (
		<div>
			<Layout>
				<h1 className="text-2xl text-gray-800 font-light">Productos</h1>

				<Link href="/NuevoProducto">
					<a className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-5 mt-3 inline-block rounded text-sm mb-3 uppercase font-bold">
						Nuevo Producto
					</a>
				</Link>

				<table className="table-auto shadow-md mt-10 w-full w-lg">
					<thead className="bg-gray-800">
						<tr className="text-white">
							<th className="w-1/5 py-2">Nombre</th>
							<th className="w-1/5 py-2">Existencia</th>
							<th className="w-1/5 py-2">Precio</th>
							<th className="w-1/5 py-2">Acciones</th>
						</tr>
					</thead>

					<tbody className="bg-white">
						{data?.obtenerProductos?.map((producto) => (
							<Producto key={producto.id} producto={producto} />
						))}
					</tbody>
				</table>
			</Layout>
		</div>
	);
};

export default Productos;
