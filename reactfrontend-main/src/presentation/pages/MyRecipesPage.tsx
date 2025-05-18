import React, { useState, useEffect } from "react";
import { Button, IconButton, TablePagination, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Typography, Box, CircularProgress, Alert, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useIntl } from "react-intl";
import { useGetRecipes, useAddRecipe, useUpdateRecipe, useDeleteRecipe } from "@infrastructure/apis/api-management/recipe";
import { useGetIngredients } from "@infrastructure/apis/api-management/ingredient";
import { DataTable } from "@presentation/components/ui/Tables/DataTable";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout/WebsiteLayout";
import { IngredientDTO } from "@infrastructure/apis/client/models/IngredientDTO";
import { RecipeDTO } from "@infrastructure/apis/client/models/RecipeDTO";
import { useAppSelector } from "@application/store";

const defaultForm = { description: '', ingredientIds: [] as string[], id: undefined };

const MyRecipesPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const userId = useAppSelector(x => x.profileReducer.userId);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<typeof defaultForm>(defaultForm);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const { data, isLoading, isError, refetch } = useGetRecipes(page, pageSize, search);
  const addRecipe = useAddRecipe();
  const updateRecipe = useUpdateRecipe();
  const deleteRecipe = useDeleteRecipe();

  // Fetch all ingredients for selection (first 100 for simplicity)
  const { data: ingredientsData } = useGetIngredients(1, 100, '');
  const ingredientOptions: IngredientDTO[] = ingredientsData?.response?.data || [];

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, search]);

  const handleOpenForm = (recipe?: any) => {
    setForm(recipe ? {
      ...recipe,
      ingredientIds: recipe.ingredients ? recipe.ingredients.map((i: IngredientDTO) => i.id) : []
    } : defaultForm);
    setOpen(true);
    setErrors({});
  };
  const handleCloseForm = () => setOpen(false);
  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.description.trim()) newErrors.description = formatMessage({ id: "recipes.error.description", defaultMessage: "Description is required" });
    if (!form.ingredientIds || form.ingredientIds.length === 0) newErrors.ingredientIds = formatMessage({ id: "recipes.error.ingredients", defaultMessage: "At least one ingredient is required" });
    return newErrors;
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name!]: value }));
    setErrors(errs => {
      const newErrs = { ...errs };
      delete newErrs[name!];
      return newErrs;
    });
  };
  const handleIngredientChange = (event: any) => {
    const { value } = event.target;
    setForm(f => ({ ...f, ingredientIds: typeof value === 'string' ? value.split(',') : value }));
    setErrors(errs => {
      const newErrs = { ...errs };
      delete newErrs.ingredientIds;
      return newErrs;
    });
  };
  const handleSubmit = async () => {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    if (form.id) {
      await updateRecipe.mutateAsync(form);
    } else {
      await addRecipe.mutateAsync({ ...form, authorId: userId });
    }
    setOpen(false); refetch();
    setForm(defaultForm);
    setErrors({});
  };
  const handleDelete = async () => {
    if (deleteId) await deleteRecipe.mutateAsync(deleteId);
    setDeleteId(null); refetch();
  };

  const header: import("@presentation/components/ui/Tables/DataTable/DataTable.types").DataTableHeader<RecipeDTO> = [
    { key: "description", name: formatMessage({ id: "globals.description", defaultMessage: "Description" }), order: 1 },
    { key: "ingredients", name: formatMessage({ id: "recipes.ingredients", defaultMessage: "Ingredients" }), order: 2, render: (value) => <span>{Array.isArray(value) ? value.map((i: IngredientDTO) => i.name).join(", ") : ""}</span> }
  ];
  const extraHeader = [
    { key: "edit", name: '', order: 2, render: (entry: any) => <IconButton onClick={() => handleOpenForm(entry)}><EditIcon /></IconButton> },
    { key: "delete", name: '', order: 3, render: (entry: any) => <IconButton onClick={() => setDeleteId(entry.id)}><DeleteIcon /></IconButton> },
  ];

  return (
    <WebsiteLayout>
      <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="80vh" bgcolor="#f7fafc" py={4}>
        <Card sx={{ maxWidth: 900, width: '100%', boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h5" fontWeight={600}>{formatMessage({ id: "recipes.title", defaultMessage: "My Recipes" })}</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenForm()}>{formatMessage({ id: "globals.add", defaultMessage: "Add" })}</Button>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <TextField label={formatMessage({ id: "globals.search", defaultMessage: "Search" })} value={search} onChange={e => setSearch(e.target.value)} size="small" sx={{ width: 300 }} />
            </Box>
            {isError && <Alert severity="error">{formatMessage({ id: "recipes.error.load", defaultMessage: "Failed to load recipes." })}</Alert>}
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
        <Dialog open={open} onClose={handleCloseForm} fullWidth maxWidth="sm">
          <DialogTitle>{form.id ? formatMessage({ id: "globals.edit", defaultMessage: "Edit" }) : formatMessage({ id: "globals.add", defaultMessage: "Add" })}</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label={formatMessage({ id: "globals.description", defaultMessage: "Description" })} name="description" value={form.description} onChange={handleFormChange} fullWidth error={!!errors.description} helperText={errors.description} autoFocus />
            <FormControl fullWidth margin="dense" error={!!errors.ingredientIds} sx={{ mt: 2 }}>
              <InputLabel>{formatMessage({ id: "recipes.ingredients", defaultMessage: "Ingredients" })}</InputLabel>
              <Select
                multiple
                name="ingredientIds"
                value={form.ingredientIds}
                onChange={handleIngredientChange}
                renderValue={(selected: any) => ingredientOptions.filter((i) => selected.includes(i.id)).map((i) => i.name).join(', ')}
                label={formatMessage({ id: "recipes.ingredients", defaultMessage: "Ingredients" })}
              >
                {ingredientOptions.map((ingredient) => (
                  <MenuItem key={ingredient.id} value={ingredient.id}>
                    <Checkbox checked={form.ingredientIds.indexOf(ingredient.id) > -1} />
                    <ListItemText primary={ingredient.name} />
                  </MenuItem>
                ))}
              </Select>
              {errors.ingredientIds && <Typography color="error" variant="caption">{errors.ingredientIds}</Typography>}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>{formatMessage({ id: "globals.cancel", defaultMessage: "Cancel" })}</Button>
            <Button onClick={handleSubmit} variant="contained" disabled={addRecipe.status === 'pending' || updateRecipe.status === 'pending'} startIcon={(addRecipe.status === 'pending' || updateRecipe.status === 'pending') ? <CircularProgress size={20} /> : null}>
              {formatMessage({ id: "globals.save", defaultMessage: "Save" })}
            </Button>
          </DialogActions>
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
          <DialogTitle>{formatMessage({ id: "globals.confirmDelete", defaultMessage: "Confirm Delete" })}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>{formatMessage({ id: "globals.cancel", defaultMessage: "Cancel" })}</Button>
            <Button onClick={handleDelete} color="error" variant="contained" disabled={deleteRecipe.status === 'pending'} startIcon={deleteRecipe.status === 'pending' ? <CircularProgress size={20} /> : null}>
              {formatMessage({ id: "globals.delete", defaultMessage: "Delete" })}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </WebsiteLayout>
  );
};

export default MyRecipesPage;
