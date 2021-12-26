import React from 'react';
import { FC, useState, useEffect, useCallback } from 'react';
import { createTheme, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import UndoDeleteIcon from '@material-ui/icons/RestoreFromTrash';
import {
	DataGrid,
	GridColDef,
	GridEditRowsModel,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridCellValue,
	GridCellEditCommitParams,
	GridCellParams,
} from '@mui/x-data-grid';
import { RsvpListValues, RsvpEdits } from '../model/rsvpTypes';
import { useRsvpListen } from './useRsvpListen';
import { db } from '../firebase/config';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { renderCellExpand } from './RsvpTableRenderCellExpand';
import './rsvpTable.css';

function getThemePaletteMode(palette: any): string {
	return palette.type || palette.mode;
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
	(theme: Theme) => {
		const isDark = getThemePaletteMode(theme.palette) === 'dark';

		return {
			root: {
				'& .MuiDataGrid-row': {
					textDecoration: 'none',
				},
				'& .MuiDataGrid-cell--edited': {
					backgroundColor: 'rgb(255, 244, 229)',
					border: '1px solid #ff9800',
				},
				'& .Mui-error': {
					backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
					color: isDark ? '#ff4343' : '#750f0f',
				},
			},
		};
	},
	{ defaultTheme }
);

const CustomToolbar = () => {
	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
			<GridToolbarExport csvOptions={{ allColumns: true }} />
		</GridToolbarContainer>
	);
};

export const RsvpTable: FC = () => {
	const classes = useStyles();
	// const [pageSize, setPageSize] = React.useState<number>(5);
	const [loading, setLoading] = useState(true);
	const [disable, setDisable] = useState(false);
	const [rows, setRows] = useState<RsvpListValues[] | undefined>(undefined);
	const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});
	const [edits, setEdits] = useState<RsvpEdits>({});
	const [deletes, setDeletes] = useState<string[]>([]);
	const unsaved = Object.keys(edits).length + deletes.length !== 0;

	const rsvpList = useRsvpListen();

	const updateRowsOnDbUpdate = async () => {
		if (
			rsvpList &&
			!disable &&
			JSON.stringify(rows) !== JSON.stringify(rsvpList)
		) {
			await new Promise((resolve) =>
				setTimeout(() => resolve(setLoading(true)), 0)
			);
			if (unsaved) {
				const tempRsvpList = [...rsvpList];
				for (const id in edits) {
					const index = tempRsvpList.findIndex(
						(guest) => guest.id === id
					);
					tempRsvpList[index] = {
						...tempRsvpList[index],
						...edits[id],
					};
				}
				setRows(tempRsvpList);
			} else {
				setRows(rsvpList);
			}
			await new Promise((resolve) =>
				setTimeout(() => resolve(setLoading(false)), 0)
			);
		}
	};

	useEffect(() => {
		updateRowsOnDbUpdate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rsvpList, disable]);

	const handleEdits = useCallback((newModel: GridEditRowsModel) => {
		const updatedModel = { ...newModel };
		for (const id in updatedModel) {
			if (updatedModel[id].firstName) {
				const isValid = validateName(updatedModel[id].firstName.value);
				updatedModel[id].firstName = {
					...updatedModel[id].firstName,
					error: !isValid,
				};
			} else if (updatedModel[id].lastName) {
				const isValid = validateName(updatedModel[id].lastName.value);
				updatedModel[id].lastName = {
					...updatedModel[id].lastName,
					error: !isValid,
				};
			} else if (updatedModel[id].email) {
				const isValid = validateEmail(updatedModel[id].email.value);
				updatedModel[id].email = {
					...updatedModel[id].email,
					error: !isValid,
				};
			} else if (updatedModel[id].phone) {
				const isValid = validatePhone(updatedModel[id].phone.value);
				updatedModel[id].phone = {
					...updatedModel[id].phone,
					error: !isValid,
				};
			} else {
				for (const key in updatedModel[id]) {
					updatedModel[id][key] = {
						...updatedModel[id][key],
						error: false,
					};
				}
			}
		}
		setEditRowsModel(updatedModel);
	}, []);

	const handleCellCommit = useCallback(
		(params: GridCellEditCommitParams) => {
			if (rsvpList && rows) {
				const id = params.id;
				const field = params.field as
					| 'firstName'
					| 'lastName'
					| 'email'
					| 'phone'
					| 'singapore'
					| 'copenhagen'
					| 'dietaryReq'
					| 'other';
				const value = params.value;

				// get rsvpList index
				const index = rsvpList.findIndex((guest) => guest.id === id);

				const updatedRows = [...rows];
				const updatedEdits = { ...edits };

				if (
					rsvpList[index][field] !== value // if field value has changed
				) {
					// update `edits` state with new change
					updatedEdits[id] = {
						...updatedEdits[id],
						...{ [field]: value },
					};
				} else {
					// omit/remove changes
					if (updatedEdits[id]) {
						if (updatedEdits[id][field] !== undefined) {
							delete updatedEdits[id][field];
							if (Object.keys(updatedEdits[id]).length === 0) {
								delete updatedEdits[id];
							}
						}
					}
				}
				// update `rows` and `edits`
				updatedRows[index] = {
					...updatedRows[index],
					...{ [field]: value },
				};
				setRows(updatedRows);
				setEdits(updatedEdits);
			}
		},
		[rsvpList, rows, edits]
	);

	const undoEdits = () => {
		setEdits({});
		setDeletes([]);
		setRows(rsvpList);
	};

	const saveEdits = async () => {
		// disable table
		setDisable(true);
		setLoading(true);

		const editsDeletes = { ...edits }; // for merging `edits` and `deletes`

		// update db using `deletes`
		for (const id of deletes) {
			// merge `edits` and `deletes`
			if (editsDeletes[id]) {
				delete editsDeletes[id];
			}

			// Delete document for associated guest from db
			await deleteDoc(doc(db, 'rsvp', id));
		}

		// update db using `edits`
		for (const id in editsDeletes) {
			const edit: any = editsDeletes[id];
			const guestRef = doc(db, 'rsvp', id);

			for (const field in edit) {
				await updateDoc(guestRef, {
					[field]: edit[field],
				});
			}
		}

		// reset
		setEdits({});
		setDeletes([]);
		setLoading(false);
		setDisable(false);
	};

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			width: 210,
			sortable: false,
			editable: false,
			hide: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'firstName',
			headerName: 'First name',
			width: 132,
			editable: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'lastName',
			headerName: 'Last name',
			width: 132,
			editable: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'email',
			headerName: 'Email',
			width: 240,
			editable: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'phone',
			headerName: 'Phone',
			width: 145,
			editable: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'singapore',
			headerName: 'Singapore',
			type: 'boolean',
			width: 125,
			editable: true,
		},
		{
			field: 'copenhagen',
			headerName: 'Copenhagen',
			type: 'boolean',
			width: 137,
			editable: true,
		},
		{
			field: 'dietaryReq',
			headerName: 'Dietary Req.',
			flex: 1,
			minWidth: 160,
			editable: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'other',
			headerName: 'Other',
			flex: 1,
			minWidth: 160,
			editable: true,
			renderCell: renderCellExpand,
		},
		{
			field: 'createdAt',
			headerName: 'Created At',
			type: 'dateTime',
			width: 160,
			editable: false,
		},
		{
			field: 'action',
			headerName: 'Action',
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			renderCell: (params) => {
				const id = String(params.id);
				const rowedited = Object.keys(edits).includes(id);
				const rowDeleted = deletes.includes(id);

				const handleUndo = (e: React.MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking

					// get rsvpList index
					const index = rsvpList!.findIndex(
						(guest) => guest.id === id
					);

					const updatedRows = [...rows!];
					const updatedEdits = { ...edits };

					// remove changes (update `rows` and `edits`)
					delete updatedEdits[id];
					updatedRows[index] = { ...rsvpList![index] };
					setRows(updatedRows);
					setEdits(updatedEdits);
				};

				const handleDelete = (e: React.MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking

					const updatedDeletes = [...deletes];
					updatedDeletes.push(id);
					setDeletes(updatedDeletes);
				};

				const handleRestore = (e: React.MouseEvent) => {
					e.stopPropagation(); // don't select this row after clicking

					setDeletes(deletes.filter((deletedId) => deletedId !== id));
				};

				return (
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<IconButton
							color="inherit"
							size="small"
							aria-label="undo"
							onClick={handleUndo}
							disabled={disable ? true : !rowedited}
						>
							<UndoIcon fontSize="small" />
						</IconButton>
						{!rowDeleted ? (
							<IconButton
								color="inherit"
								size="small"
								aria-label="delete"
								onClick={handleDelete}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						) : (
							<IconButton
								color="inherit"
								size="small"
								aria-label="restore"
								onClick={handleRestore}
							>
								<UndoDeleteIcon fontSize="small" />
							</IconButton>
						)}
					</div>
				);
			},
		},
	];

	return (
		<div style={{ height: 'calc(100% - 48px)', width: '100%' }}>
			<Alert
				severity={unsaved ? 'warning' : 'success'}
				style={{ marginBottom: 8 }}
				action={
					unsaved ? (
						<ButtonGroup
							variant="text"
							color="inherit"
							aria-label="text primary button group"
						>
							<Button onClick={undoEdits}>UNDO</Button>
							<Button onClick={saveEdits}>SAVE</Button>
						</ButtonGroup>
					) : null
				}
			>
				{unsaved ? 'Unsaved Changes' : 'Up to Date'}
			</Alert>
			<DataGrid
				className={classes.root}
				rows={rows ? rows : []}
				columns={columns}
				pagination
				autoPageSize
				// pageSize={pageSize}
				// onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				// rowsPerPageOptions={[5, 10, 20]}
				// autoHeight
				checkboxSelection={false}
				disableSelectionOnClick
				disableColumnMenu
				components={{
					Toolbar: CustomToolbar,
				}}
				isCellEditable={(params: GridCellParams) =>
					disable ? false : !deletes.includes(String(params.id))
				}
				editRowsModel={editRowsModel}
				onEditRowsModelChange={handleEdits} // for cell edit validation
				onCellEditCommit={handleCellCommit} // for commiting cell edits
				getRowClassName={(params) => {
					if (deletes.includes(String(params.id))) {
						return 'MuiDataGrid-row--deleted';
					} else {
						return '';
					}
				}}
				getCellClassName={(params: GridCellParams) => {
					const edited_row: any = edits[params.id];

					if (edited_row && edited_row[params.field] !== undefined) {
						return 'MuiDataGrid-cell--edited';
					} else {
						return '';
					}
				}}
				loading={loading}
			/>
		</div>
	);
};

function validateName(name: GridCellValue) {
	return name ? true : false;
}

function validateEmail(email: GridCellValue) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function validatePhone(phone: GridCellValue) {
	return phone ? isValidPhoneNumber(String(phone)) : true;
}
