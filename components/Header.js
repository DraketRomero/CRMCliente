import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
	query obtenerUsuario {
		obtenerUsuario {
			id
			nombre
			apellido
			email
		}
	}
`;

export const Header = () => {
    const router = useRouter();
	const { data, loading, error } = useQuery(OBTENER_USUARIO);

    if (loading) return <></>;
    
	if (!data.obtenerUsuario) {
		return router.push("/Login");
	}

    const { nombre, apellido } = data.obtenerUsuario;

	const cerrarSesion = () => {
		localStorage.removeItem("token");
		router.push("/Login");
	};

	return (
		<div className="sm:flex sm:justify-between mb-6">
			<p className="mr-2 b-5 lg:mb-0">
				Hola: {nombre} {apellido}
			</p>

			<button
				type="button"
				className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
				onClick={cerrarSesion}
			>
				Cerrar sesion
			</button>
		</div>
	);
};
