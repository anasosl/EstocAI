import React from "react";
import assets from '../../assets'; // Importar a imagem
import { BackgroundImage, PageContainer, StorangeOrangeBackground } from "./style";
import { StorangeOrangeLogo } from "../Login/style";


export const Cadastro: React.FC = () => {
  
  return (
    <PageContainer>
        <StorangeOrangeLogo src={assets.storangeOrangeLogo} alt="Logo" />
        <h3>Acesse sua conta</h3>
        <form>
          <input type="text" placeholder="Número de telefone ou e-mail" />
          <input type="password" placeholder="Senha" />
          <button >Entrar</button>
      
      
        </form>
      <StorangeOrangeBackground src={assets.storangeOrangeBackground}/>
    </PageContainer>
  );
};

export default Cadastro;