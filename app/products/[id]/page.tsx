export default function Product({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}