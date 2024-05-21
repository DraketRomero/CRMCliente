import React, { useContext, useState } from "react";
import { Layout } from "../components/Layout";
import {
	AsignarCliente,
	AsignarProductos,
	ResumenPedido,
	Total,
} from "../components/Pedidos";
import PedidoContext from "../context/Pedidos/PedidoContext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input: PedidoInput) {
		nuevoPedido(input: $input) {
			id
		}
	}
`;

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

const NuevoPedido = () => {
	const router = useRouter()
	const [mensaje, setMensaje] = useState(null);
	//Utilzar context y extraer valores
	const pdoCtx = useContext(PedidoContext);
	const { cliente, productos, total } = pdoCtx;

	// Mutation para nuevo pedido
	const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
		update(cache, { data: { nuevoPedido }}) {
			const { obtenerPedidosVendedor } = cache.readQuery({
				query: OBTENER_PEDIDOS
			});

			cache.writeQuery({
				query: OBTENER_PEDIDOS,
				data: {
					obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
				}
			})

		}
	});

	const validarPedido = () => {
		return !productos.every((prd) => prd.cantidad > 0) ||
			total === 0 ||
			cliente.length === 0
			? " opacity-50 cursor-not-allowed "
			: "";
	};

	const crearPedido = async () => {
		const { id } = cliente;
		const pedido = productos.map(
			({ __typename, existencia, ...producto }) => producto
		);

		try {
			const { data } = await nuevoPedido({
				variables: {
					input: {
						cliente: id,
						total,
						pedido,
					},
				},
			});

			console.log(data);
			router.push("/Pedidos");
			Swal.fire("Correcto", "El pedido se registro correctamente.", "success");
		} catch (error) {
			setMensaje(error.message.replace("GraphQL error: ", ""));

			
			setTimeout(() => {
				setMensaje(null);
			}, 3000);
		}
	};

	const mostrarMensaje = () => {
		return (
			<div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
				<p>{mensaje}</p>
			</div>
		);
	};

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
			{mensaje && mostrarMensaje()}

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<AsignarCliente />
					<AsignarProductos />
					<ResumenPedido />
					<Total />

					<button
						type="button"
						className={`bg-blue-900 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-blue-700 ${validarPedido()}`}
						onClick={crearPedido}
					>
						Registrar pedido
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default NuevoPedido;
