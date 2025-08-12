import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingMascot from "@/components/FloatingMascot";

const ThankYou = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden" style={{
      backgroundImage: `url(/lovable-uploads/11770723-1def-4494-86a7-9a17699cfbe0.png)`
    }}>
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-unifap-blue/20 via-transparent to-unifap-cyan/20"></div>
      
      {/* Floating Mascots */}
      <FloatingMascot imagePath="/lovable-uploads/02b64623-7175-4bdd-a0df-df9fa79ac0e4.png" size="w-24 h-24 md:w-32 md:h-32" position="top-10 left-10 md:top-20 md:left-20" delay={0} />
      <FloatingMascot imagePath="/lovable-uploads/4a256c1b-9545-4644-bcc0-d0a453d01188.png" size="w-16 h-16 md:w-20 md:h-20" position="top-32 right-16 md:top-40 md:right-32" delay={1} />
      <FloatingMascot imagePath="/lovable-uploads/b1ea9909-1f7a-4f95-b170-82574e3e3697.png" size="w-20 h-20 md:w-24 md:h-24" position="bottom-40 left-8 md:bottom-60 md:left-16" delay={2} />
      <FloatingMascot imagePath="/lovable-uploads/37f1d79a-2259-4148-88dd-7b0448e67654.png" size="w-18 h-18 md:w-22 md:h-22" position="top-1/2 right-8 md:top-1/2 md:right-20" delay={3} />
      <FloatingMascot imagePath="/lovable-uploads/928ac25a-bc58-4ecd-a4b7-17971682e0ea.png" size="w-28 h-28 md:w-36 md:h-36" position="bottom-20 right-20 md:bottom-32 md:right-40" delay={1.5} />
      <FloatingMascot imagePath="/lovable-uploads/e853c80a-712b-47e6-b8a6-599d4bf0b8b3.png" size="w-22 h-22 md:w-28 md:h-28" position="top-60 left-1/4 md:top-80 md:left-1/3" delay={0.5} />
      <FloatingMascot imagePath="/lovable-uploads/beabf7d8-5df6-45b8-8530-c7bdfa0782c4.png" size="w-16 h-16 md:w-20 md:h-20" position="bottom-1/3 left-1/2 md:bottom-1/4 md:left-1/2" delay={2.5} />

      {/* Thank You Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto animate-bounce-in">
          {/* Main Logo */}
          <div className="mb-8 md:mb-12">
            <img src="/lovable-uploads/3ec4d496-9669-4251-bcec-22be52a84ed4.png" alt="Mascote UniFAP" className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto drop-shadow-2xl" />
          </div>
          
          {/* Thank You Message */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-retro font-bold text-white mb-6 drop-shadow-lg">
              🎉 Obrigado!
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-modern font-bold text-unifap-cyan mb-6 drop-shadow-lg">
              Sua inscrição foi enviada com sucesso!
            </h2>
            
            <div className="space-y-4 text-white/90 font-modern text-lg md:text-xl">
              <p>
                Sua proposta de mascote foi recebida e está sendo analisada pela nossa equipe.
              </p>
              <p>
                Em breve entraremos em contato com mais informações sobre o concurso.
              </p>
              <p className="text-unifap-orange font-semibold">
                Boa sorte no concurso! 🍀
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={goToHome}
              className="bg-gradient-warm hover:bg-gradient-vibrant text-white font-retro text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-full shadow-glow transition-all duration-300 hover:scale-110 hover:shadow-xl"
            >
              🏠 Voltar ao Início
            </Button>
            
            <a 
              href="https://drive.google.com/file/d/1s0MFg9WG3qn4Fwfsw0p0a03dRD5_XoiQ/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                className="bg-white/10 border-white text-white hover:bg-white hover:text-unifap-blue font-retro text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 rounded-full transition-all duration-300 hover:scale-110"
              >
                📄 Ver Edital Completo
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-unifap-blue/90 backdrop-blur-sm py-8 md:py-12 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-retro text-unifap-cyan mb-4">
              UniFAP - Centro Universitário
            </h3>
            <p className="text-white/80 font-modern max-w-2xl mx-auto">
              Obrigado por participar do nosso concurso! Sua criatividade ajudará a criar a nova identidade visual da UniFAP.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-unifap-cyan mb-2">Contato</h4>
              <p className="text-white/80">📧 fap@fapce.edu.br</p>
              <p className="text-white/80">📞 (88) 3512-3299</p>
            </div>
            <div>
              <h4 className="font-semibold text-unifap-cyan mb-2">Recursos</h4>
              <a href="https://drive.google.com/file/d/1s0MFg9WG3qn4Fwfsw0p0a03dRD5_XoiQ/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-unifap-cyan text-unifap-cyan hover:bg-unifap-cyan hover:text-white">
                  📄 Acessar Edital do Concurso
                </Button>
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/60 text-sm">
              © 2025 UniFAP - Todos os direitos reservados. Concurso Mascote UniFAP.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThankYou;