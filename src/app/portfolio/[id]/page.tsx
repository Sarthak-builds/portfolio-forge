import { Metadata } from 'next';
import PortfolioDetailContent from './PortfolioDetailContent';

async function getPortfolio(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const apiBase = baseUrl.endsWith('/') ? baseUrl + 'api' : baseUrl + '/api';
  
  try {
    const res = await fetch(`${apiBase}/portfolios/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : json;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const portfolio = await getPortfolio(params.id);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  return {
    title: portfolio.title,
    description: portfolio.description || `Check out ${portfolio.title} on Portfolio Forge.`,
    openGraph: {
      title: `${portfolio.title} | Portfolio Forge`,
      description: portfolio.description,
      images: [portfolio.imageUrl || '/og-image.png'],
    },
  };
}

export default function Page() {
  return <PortfolioDetailContent />;
}
