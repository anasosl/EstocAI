import * as React from 'react';
import { Box } from '@mui/material';
import { theme } from '../../styles/theme';

interface MedicamentoTypeProps {
  type: string;
}

export const MedicamentoType: React.FC<MedicamentoTypeProps> = ({ type }) => {
  const isCritical = type === 'Critical';

  const label = isCritical
    ? 'Medicamento Essencial'
    : 'Medicamento Básico';

  const message_1 = isCritical
    ? 'É necessário priorizar sua compra e reposição imediata em caso de baixa disponibilidade.'
    : 'É necessário repor quando preciso em caso de baixa disponibilidade.';

  const message_2 = isCritical
    ? 'Este item é essencial para o funcionamento do hospital e deve ser mantido em estoque constante.'
    : 'Este item não é prioritário para o funcionamento do hospital, mas deve ser mantido em estoque constante.';

  const backgroundColor = isCritical
    ? theme.colors.verdeSuave
    : theme.colors.laranjaSuave;

  return (
    <Box
      sx={{
        marginTop: '20px',
        marginLeft: '20px',
        display: 'inline-block',
        width: 'fit-content'
      }}
    >
      <Box
        component="span"
        sx={{
          display: 'inline-block',
          px: 2.5,
          py: 1,
          borderRadius: '24px',
          backgroundColor,
          color: theme.colors.preto,
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: 1,
          userSelect: 'none'
        }}
      >
        {label}
      </Box>
      
      <ul style={{ margin: '20px 0 0 0', paddingLeft: '20px', paddingBottom: '25px' }}>
        <li>{message_1}</li>
        <li>{message_2}</li>
      </ul>
    </Box>
  );
};

export default MedicamentoType;