import React from "react";
import { Layout } from "../components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { Pedido } from "../components/Pedidos/Pedido";

const OBTENER_PEDIDOS = gql`
	query obtenerPedidosVendedor {
		obtenerPedidosVendedor {
			id
			pedido {
				id
				nombre
				cantidad
			}
			cliente {
				id
				nombre
				apellido
				email
				telefono
			}
			vendedor
			total
			estado
		}
	}
`;

const Pedidos = () => {
	const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

	console.log(data, loading, error);

	if (loading) return "Cargando...";

	const { obtenerPedidosVendedor } = data;

	return (
		<div>
			<Layout>
				<h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

				<Link href="/NuevoPedido">
					<a className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-5 mt-3 inline-block rounded text-sm mb-3 uppercase font-bold">
						Nuevo Pedido
					</a>
				</Link>

				{obtenerPedidosVendedor.length === 0 ? (
					<p className="mt-5 text-center text-2xl">Aun no hay pedidos</p>
				) : (
					obtenerPedidosVendedor?.map((pedido) => (
						<Pedido key={pedido?.id} pedido={pedido} />
					))
				)}
			</Layout>
		</div>
	);
};

export default Pedidos;
