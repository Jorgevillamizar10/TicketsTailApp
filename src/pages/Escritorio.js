import React, { useState, useContext } from "react";
import { Row, Col, Typography, Button, Divider } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Redirect, useHistory } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const Escritorio = () => {
	useHideMenu(false);
	const [usuario] = useState(getUsuarioStorage);
	const [ticket, setTicket] = useState(null);
	const { socket } = useContext(SocketContext);
	const history = useHistory();

	const salir = () => {
		// localStorage.clear(); -> para borrar todo lo que este en el localstorage de manera global
		localStorage.clear("agente");
		localStorage.clear("escritorio");
		history.push("/ingresar");
	};

	const SiguienteTicket = () => {
		socket.emit("siguiente-ticket-trabajar", usuario, (ticket) => {
			setTicket(ticket);
		});
	};

	if (!usuario.agente || !usuario.escritorio) {
		//validando que si ya entro no pueda regresar
		return <Redirect to="/ingresar" />;
	}

	return (
		<>
			<Row>
				<Col span={20}>
					<Title level={2}>{usuario.agente}</Title>
					<Text>Usted esta trabajando en el escritorio: </Text>
					<Text type="success">{usuario.escritorio}</Text>
				</Col>

				<Col span={4} align="right">
					<Button shape="round" type="danger" onClick={salir}>
						<CloseCircleOutlined />
						Salir
					</Button>
				</Col>

				<Divider />

				{ticket && (
					<Row>
						<Col>
							<Text>Esta atendiendo el ticket numero: </Text>
							<Text style={{ fontSize: 30 }} type="danger">
								{ticket.numero}
							</Text>
						</Col>
					</Row>
				)}

				<Row>
					<Col offset={18} span={6} align="right">
						<Button onClick={SiguienteTicket} shape="round" type="primary">
							<RightOutlined />
							Siguiente
						</Button>
					</Col>
				</Row>
			</Row>
		</>
	);
};
