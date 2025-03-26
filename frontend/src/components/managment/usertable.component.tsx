import React, { useState } from 'react';
import { ArrowUpDown, Plus } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {AutoComplete} from '../utils/autocomplete.utils.component';
import { useUsersTask } from "../../hooks/users.hook";
import { AddUserDialog } from './adduserdialog.components';
type User = {
    name: string
    role: string
    status: string
}



export const UsersTable = () => {
    const { setEntry, Entry } = useUsersTask();
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    //@ts-ignore
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [markedRows, setMarkedRows] = useState<{[key: string]: boolean}>({})
    const [page, setPage] = useState(0);
    const [pageSize] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="min-w-[200px]"
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium min-w-[200px]">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "role",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="min-w-[200px]"
                    >
                        Role
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="min-w-[200px]">{row.getValue("role")}</div>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="min-w-[200px]"
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="min-w-[200px]">{row.getValue("status")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const rowId = row.id
                return (
                    <Button 
                        variant={markedRows[rowId] ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setMarkedRows(prev => ({...prev, [rowId]: !prev[rowId] }))}
                        className="min-w-[100px]"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                )
            },
        },
    ]


    const userDelete = () => {
        setEntry(prevUserData =>
            prevUserData.filter((_, index) => !markedRows[index])
        );
        setMarkedRows({});
        setIsDialogOpen(false);

    }
    const table = useReactTable({
        data: Entry.map((entry) => ({
            name: entry.employeeName, 
            role: entry.role,       
            status: entry.status,    
        })),
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        pageCount: Math.ceil(Entry.length / pageSize),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination: { pageIndex: page, pageSize },
        },
        onPaginationChange: (updater) => {
            console.log("updater", updater);
            if (typeof updater === "function") {
              const newPagination = updater({ pageIndex: page, pageSize });
              setPage(newPagination.pageIndex);
            } else {
                setPage(updater.pageIndex); 
            }
          },
          manualPagination: false,
        });


        const onValueChange = (value: string) => {
            setSearchValue(value) 
            table.getColumn("name")?.setFilterValue(value)
        }
        
    return (
        <div className="w-full ">
            <Card className="w-full lg:min-h-[200px] sm:min-h-[100px] shadow-sm rounded-lg bg-background">
                <CardHeader className="pb-2 px-8">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl">Users Manager</CardTitle>
                        <AutoComplete                        
                            items={Entry.map((user) => ({ value: user.employeeName, label: user.employeeName }))}
                            selectedValue={selectedUser}
                            onSelectedValueChange={(value) => setSelectedUser(value)}
                            searchValue={searchValue}
                            onSearchValueChange={onValueChange}
                            onChangefunc={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)}/>
                                
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="min-w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="border-b hover:bg-transparent">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="text-base font-bold h-12 px-6">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="border-b hover:bg-transparent"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="text-base py-4 px-6">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} users(s) total.
                </div>
                
                <AddUserDialog>
                    <Button
                        className="bg-gray-800 text-white hover:bg-gray-900"
                        size="lg"
                        onClick={() => console.log("Add user clicked")}
                        
                    >
                        Add User
                    </Button>
                </AddUserDialog>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                    
                        <Button 
                            variant="destructive"
                            size="lg"
                            disabled={!Object.values(markedRows).some(Boolean)}
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Delete
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user/s?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={() => userDelete()}>Delete</Button>
        </DialogFooter>
      </DialogContent>
                </Dialog>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
