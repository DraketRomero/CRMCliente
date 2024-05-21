import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/Pedidos/PedidoContext";

const OBTENER_CLIENTES_USUARIO = gql`
	query obtenerClientesVendedor {
		obtenerClientesVendedor {
			id
			nombre
			apellido
			empresa
			email
		}
	}
`;

export const AsignarCliente = () => {
	const [clientes, setClientes] = useState([]);

    // Context de pedidos
    const pdoCtx = useContext(PedidoContext);
    const { addCliente } = pdoCtx;

	const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

	useEffect(() => {
		addCliente(clientes);
	}, [clientes]);

	const slcCliente = (cliente) => {
		setClientes(cliente);
	};

	if (loading) return null;

	const { obtenerClientesVendedor } = data;

	return (
		<>
			<p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
				1.- Para quien es el pedido?
			</p>
			<Select
				className="mt-3"
				options={obtenerClientesVendedor}
				onChange={(clt) => slcCliente(clt)}
				getOptionValue={(opciones) => opciones.id}
				getOptionLabel={(opciones) => opciones.nombre}
				placeholder="Seleccione un cliente"
				noOptionsMessage={() => "No hay resultados"}
			/>
		</>
	);
};
