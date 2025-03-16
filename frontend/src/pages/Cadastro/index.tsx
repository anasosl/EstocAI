import React from "react";
import assets from '../../assets'; // Importar a imagem
import { BackgroundImage, PageContainer, StorangeOrangeBackground } from "./style";
import { StorangeOrangeLogo } from "../Login/style";
import { InputAdornments } from "../../components";
import { caracterCustomizado } from "../../utils/Regex/masks";


export const Cadastro: React.FC = () => {
  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    cpf: '',
    phone: '',
  });
  const [errorMessages, setErrorMessages] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    cpf: '',
    phone: '',
  });

  return (
    <PageContainer>
        <StorangeOrangeLogo src={assets.storangeOrangeLogo} alt="Logo" />
        <h3>Acesse sua conta</h3>
        <InputAdornments
          id="input-nome"
          placeholder="Nome"
          value={userData.name}
          setValue={(text: any) => setUserData({ ...userData, name: caracterCustomizado(text, 50) })}
          type="text"
          width="100%"
          errorMessage={errorMessages.name}
        />
      
      
      <StorangeOrangeBackground src={assets.storangeOrangeBackground}/>
    </PageContainer>
  );
};

export default Cadastro;