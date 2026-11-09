import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import FormInput from '@/Components/Form/FormInput';
import { useBookForm } from '@/Hooks/useBookForm';
import { BookOpen, Save, ArrowLeft, Upload, X, Image as ImageIcon, Info } from 'lucide-react';

export default function BookForm({ book, categories }) {
    const isEdit = !!book;
    const { 
        data, setData, processing, errors, 
        preview, fileName, fileInputRef, 
        handleFileChange, removeImage, submit 
    } = useBookForm(book, isEdit);

    const breadcrumbItems = [
        { label: 'Dashboard', href: route('dashboard') },
        { label: 'Library', href: route('library.books.index') },
    ];

    return (
        <AppLayout title={isEdit ? 'Edit Book' : 'Add Book'}>
            <Head title={isEdit ? 'Edit Book' : 'Add Book'} />
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Breadcrumb title="Library" subTitle={isEdit ? 'Edit Book' : 'Add Book'} breadcrumbItems={breadcrumbItems} />
                    <Link href={route('library.books.index')} className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
                    </Link>
                </div>
                
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                   
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Book Information
                                </h2>
                                <div className="space-y-5">
                                    <FormInput 
                                        label="Book Title" 
                                        value={data.title} 
                                        onChange={(v) => setData('title', v)} 
                                        error={errors.title} 
                                        placeholder="e.g., Introduction to Algorithms" 
                                        required 
                                    />

                                
                                        <FormInput 
                                            label="Author" 
                                            value={data.author} 
                                            onChange={(v) => setData('author', v)} 
                                            error={errors.author} 
                                            placeholder="e.g., Thomas H. Cormen" 
                                        />
                                        <FormInput 
                                            label="Publisher" 
                                            value={data.publisher} 
                                            onChange={(v) => setData('publisher', v)} 
                                            error={errors.publisher} 
                                            placeholder="e.g., MIT Press" 
                                        />
                                 

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormInput 
                                            label="Book No / Accession No" 
                                            value={data.book_no} 
                                            onChange={(v) => setData('book_no', v)} 
                                            error={errors.book_no} 
                                            placeholder="e.g., BK-001" 
                                            required 
                                        />
                                        <FormInput 
                                            label="ISBN" 
                                            value={data.isbn} 
                                            onChange={(v) => setData('isbn', v)} 
                                            error={errors.isbn} 
                                            placeholder="e.g., 978-0262033848" 
                                        />
                                        <FormInput 
                                            label="Publish Year" 
                                            type="number"
                                            value={data.publish_year} 
                                            onChange={(v) => setData('publish_year', v)} 
                                            error={errors.publish_year} 
                                            placeholder="e.g., 2009" 
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput 
                                            label="Rack / Shelf No" 
                                            value={data.rack_no} 
                                            onChange={(v) => setData('rack_no', v)} 
                                            error={errors.rack_no} 
                                            placeholder="e.g., A-12" 
                                        />
                                        <FormInput 
                                            label="Price (Rs.)" 
                                            type="number"
                                            value={data.price} 
                                            onChange={(v) => setData('price', v)} 
                                            error={errors.price} 
                                            placeholder="0.00" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                     
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-6 sticky top-6">
                                
                              
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <Info className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Classification & Stock
                                </h2>
                                <div className="space-y-5">
                                    <FormInput 
                                        label="Category" 
                                        type="select" 
                                        value={data.category_id} 
                                        onChange={(v) => setData('category_id', v)} 
                                        error={errors.category_id} 
                                        options={[
                                            { value: '', label: '-- Select Category --' },
                                            ...(categories?.map(c => ({ value: c.id, label: c.name })) || [])
                                        ]} 
                                        required 
                                    />
                                    
                                    <FormInput 
                                        label="Total Quantity" 
                                        type="number"
                                        value={data.total_quantity} 
                                        onChange={(v) => setData('total_quantity', v)} 
                                        error={errors.total_quantity} 
                                        placeholder="0" 
                                        required 
                                    />

                                    {isEdit && book?.available_quantity !== undefined && (
                                        <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200 dark:border-slate-700">
                                            <span className="text-gray-600 dark:text-gray-400">Available Stock</span>
                                            <span className="font-bold text-gray-900 dark:text-white bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded">
                                                {book.available_quantity}
                                            </span>
                                        </div>
                                    )}
                                </div>

                          
                            

                            
                                <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white mb-5 pb-2 border-b border-gray-200 dark:border-slate-700 flex items-center">
                                    <ImageIcon className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Cover Image
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <button 
                                            type="button" 
                                            onClick={() => fileInputRef.current?.click()} 
                                            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Upload className="w-4 h-4" /> Choose File
                                        </button>
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG. Max 2MB.</p>

                                    {preview ? (
                                        <div className="relative group mt-2">
                                            <img src={preview} alt="Cover Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-slate-700" />
                                            <button 
                                                type="button" 
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                title="Remove Image"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full h-48 bg-gray-50 dark:bg-slate-900 rounded-lg border border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center text-gray-400">
                                            <ImageIcon className="w-10 h-10 mb-2" />
                                            <p className="text-xs">No image selected</p>
                                        </div>
                                    )}
                                </div>

                              
                              

                             
                                <button 
                                    type="submit" 
                                    disabled={processing} 
                                    className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
                                >
                                    {processing ? <>Processing...</> : <><Save className="w-5 h-5 mr-2" /> {isEdit ? 'Update Book' : 'Add Book'}</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}