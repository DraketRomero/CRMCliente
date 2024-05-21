import React from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($id: ID!) {
		eliminarCliente(id: $id)
	}
`;

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

export const Cliente = ({ cliente }) => {
	const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
		update(cache) {
			const { obtenerClientesVendedor } = cache.readQuery({
				query: OBTENER_CLIENTES_USUARIO,
			});

			cache.writeQuery({
				query: OBTENER_CLIENTES_USUARIO,
				data: {
					obtenerClientesVendedor: obtenerClientesVendedor.filter(
						(actual) => actual.id !== id
					),
				},
			});
		},
	});

	const { id, nombre, apellido, empresa, email } = cliente;

	const eliminaCliente = () => {

		Swal.fire({
			title: "Deseas eliminar al cliente?",
			text: "Esta accion no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "No, cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const { data } = await eliminarCliente({
						variables: {
							id,
						},
					});
					Swal.fire("Eliminado!", data.eliminarCliente, "success");
				} catch (error) {
					console.log(error);
				}
			}
		});
	};

    const editarCliente = () => {
        Router.push({
            pathname: "/EditarCliente/[id]",
            query: { id }
        })
    }

	return (
		<tr>
			<td className="border px-4 py-2">
				{nombre} {apellido}
			</td>
			<td className="border px-4 py-2">{empresa}</td>
			<td className="border px-4 py-2">{email}</td>
			<td className="flex border px-4 py-2">
				<button
					type="button"
					className="flex justify-center items-center bg-blue-600 hover:bg-blue-800 py-2 px-4 w-1/5 text-white rounded text-xs uppercase font-bold mr-3"
					onClick={() => editarCliente()}
                    title="Editar cliente"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						/>
					</svg>
				</button>

				<button
					type="button"
					className="flex justify-center items-center bg-red-600 hover:bg-red-800 py-2 px-4 w-1/5 text-white rounded text-xs uppercase font-bold"
					onClick={() => eliminaCliente()}
                    title="Eliminar cliente"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
						/>
					</svg>
				</button>
			</td>
		</tr>
	);
};
