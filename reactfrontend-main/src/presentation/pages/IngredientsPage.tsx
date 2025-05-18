import React, { useState, useEffect } from "react";
import { Button, IconButton, TablePagination, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useIntl } from "react-intl";
import { useAppSelector } from "@application/store";
import { useGetIngredients, useAddIngredient, useUpdateIngredient, useDeleteIngredient } from "@infrastructure/apis/api-management/ingredient";
import { DataTable } from "@presentation/components/ui/Tables/DataTable";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout/WebsiteLayout";

const defaultForm = { name: '', description: '', id: undefined };

const IngredientsPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const isAdmin = !!useOwnUserHasRole(UserRoleEnum.Admin);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(defaultForm);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const { data, isLoading, isError, refetch } = useGetIngredients(page, pageSize, search);
  const addIngredient = useAddIngredient();
  const updateIngredient = useUpdateIngredient();
  const deleteIngredient = useDeleteIngredient();

  const handleOpenForm = (ingredient?: any) => {
    setForm(ingredient ? { ...ingredient } : defaultForm);
    setOpen(true);
  };
  const handleCloseForm = () => setOpen(false);

  // Add validation for form
  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = formatMessage({ id: "ingredients.error.name", defaultMessage: "Name is required" });
    if (!form.description.trim()) newErrors.description = formatMessage({ id: "ingredients.error.description", defaultMessage: "Description is required" });
    return newErrors;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(errs => {
      const newErrs = { ...errs };
      delete newErrs[name];
      return newErrs;
    });
  };
  const handleSubmit = async () => {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    if (form.id) await updateIngredient.mutateAsync(form);
    else await addIngredient.mutateAsync(form);
    setOpen(false); refetch();
    setForm(defaultForm);
    setErrors({});
  };
  const handleDelete = async () => {
    if (deleteId) await deleteIngredient.mutateAsync(deleteId);
    setDeleteId(null); refetch();
  };

  const header = [
    { key: "name", name: formatMessage({ id: "globals.name", defaultMessage: "Name" }), order: 1 } as const,
    { key: "description", name: formatMessage({ id: "globals.description", defaultMessage: "Description" }), order: 2 } as const,
  ];
  const extraHeader = isAdmin ? [
    { key: "edit", name: '', order: 3, render: (entry: any) => <IconButton onClick={() => handleOpenForm(entry)}><EditIcon /></IconButton> },
    { key: "delete", name: '', order: 4, render: (entry: any) => <IconButton onClick={() => setDeleteId(entry.id)}><DeleteIcon /></IconButton> },
  ] : [];

  // Background refetch on route change (like UsersPage)
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search]);

  return (
    <WebsiteLayout>
      <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="80vh" bgcolor="#f7fafc" py={4}>
        <Card sx={{ maxWidth: 900, width: '100%', boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h5" fontWeight={600}>{formatMessage({ id: "ingredients.title", defaultMessage: "Ingredients" })}</Typography>
              {isAdmin && <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenForm()}>{formatMessage({ id: "globals.add", defaultMessage: "Add" })}</Button>}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <TextField label={formatMessage({ id: "globals.search", defaultMessage: "Search" })} value={search} onChange={e => setSearch(e.target.value)} size="small" sx={{ width: 300 }} />
            </Box>
            {isError && <Alert severity="error">{formatMessage({ id: "ingredients.error.load", defaultMessage: "Failed to load ingredients." })}</Alert>}
            <Box minHeight={200}>
              {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>
              ) : (
                <DataTable header={header} extraHeader={extraHeader} data={data?.response?.data || []} />
              )}
            </Box>
            {data?.response && (
              <TablePagination
                component="div"
                count={data.response.totalCount}
                page={page - 1}
                onPageChange={(_, p) => setPage(p + 1)}
                rowsPerPage={pageSize}
                onRowsPerPageChange={e => { setPageSize(parseInt(e.target.value, 10)); setPage(1); }}
                rowsPerPageOptions={[5, 10, 20]}
              />
            )}
          </CardContent>
        </Card>
        {/* Add/Edit Dialog */}
        <Dialog open={open} onClose={handleCloseForm}>
          <DialogTitle>{form.id ? formatMessage({ id: "globals.edit", defaultMessage: "Edit" }) : formatMessage({ id: "globals.add", defaultMessage: "Add" })}</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label={formatMessage({ id: "globals.name", defaultMessage: "Name" })} name="name" value={form.name} onChange={handleFormChange} fullWidth error={!!errors.name} helperText={errors.name} autoFocus />
            <TextField margin="dense" label={formatMessage({ id: "globals.description", defaultMessage: "Description" })} name="description" value={form.description} onChange={handleFormChange} fullWidth error={!!errors.description} helperText={errors.description} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>{formatMessage({ id: "globals.cancel", defaultMessage: "Cancel" })}</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={addIngredient.status === 'pending' || updateIngredient.status === 'pending'} startIcon={(addIngredient.status === 'pending' || updateIngredient.status === 'pending') ? <CircularProgress size={20} /> : null}>
              {formatMessage({ id: "globals.save", defaultMessage: "Save" })}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle>{formatMessage({ id: "globals.confirmDelete", defaultMessage: "Confirm Delete" })}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>{formatMessage({ id: "globals.cancel", defaultMessage: "Cancel" })}</Button>
            <Button onClick={handleDelete} color="error" variant="contained" disabled={deleteIngredient.status === 'pending'} startIcon={deleteIngredient.status === 'pending' ? <CircularProgress size={20} /> : null}>
              {formatMessage({ id: "globals.delete", defaultMessage: "Delete" })}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </WebsiteLayout>
  );
};

export default IngredientsPage;
