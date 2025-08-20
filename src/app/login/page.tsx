import LoginCarousel from '@/components/Carousel';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <LoginCarousel>
        <LoginForm />
      </LoginCarousel>
    </main>
  );
}
