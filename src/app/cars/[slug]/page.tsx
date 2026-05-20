export default function CarPage({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>
}
