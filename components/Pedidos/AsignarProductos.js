import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/Pedidos/PedidoContext";

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

export const AsignarProductos = () => {
	const [productos, setProductos] = useState([]);

	// Context de pedidos
	const pdoCtx = useContext(PedidoContext);
	const { addProd } = pdoCtx;

	const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

	useEffect(() => {
		// TODO: Funcion para pasar a PedidoState.js
		addProd(productos);
	}, [productos]);
	
	const slcProd = (prod) => {
		setProductos(prod);
	};

	if (loading) return null;
	const { obtenerProductos } = data;

	return (
		<>
			<p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
				2.- Que producto quieres agregar?
			</p>
			<Select
				className="mt-3"
				options={obtenerProductos}
				onChange={(clt) => slcProd(clt)}
				getOptionValue={(opciones) => opciones.id}
				getOptionLabel={(opciones) =>
					`${opciones.nombre} - ${opciones.existencia} disponibles`
				}
				isMulti={true}
				placeholder="Seleccione un cliente"
				noOptionsMessage={() => "No hay resultados"}
			/>
		</>
	);
};
