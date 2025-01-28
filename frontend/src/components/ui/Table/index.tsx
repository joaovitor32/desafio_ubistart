import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"; // Alteração: Importando o Table do MUI diretamente.

import { Edit } from "lucide-react";
import { UseFormReset } from "react-hook-form";

const TableComponent = ({
  data,
  populateForm,
}: {
  data: any[];
  populateForm: UseFormReset<{
    name: string;
    email: string;
    zipCode: string;
    id?: string;
  }>;
}) => {
  return (
    <TableContainer component={Paper} sx={{ my: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Zip Code</strong></TableCell>
            <TableCell><strong>Editar</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address.zipCode}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        populateForm({
                          id: String(user.id),
                          name: user.name,
                          email: user.email,
                          zipCode: user.address.zipCode,
                        })
                      }
                      color="primary"
                    >
                      <Edit size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;