import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const MascotForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    curso: "",
    matricula: "",
    turno: "",
    telefone: "",
    email: "",
    nomeMascote: "",
    arquivo: null as File | null,
    justificativa: "",
    concordoTermos: false,
    declaroOriginalidade: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'nome', 'curso', 'matricula', 'turno', 'telefone', 'email', 
      'nomeMascote', 'arquivo', 'justificativa'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Campo obrigatório",
          description: `Por favor, preencha o campo ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!formData.concordoTermos || !formData.declaroOriginalidade) {
      toast({
        title: "Declarações obrigatórias",
        description: "Por favor, marque todas as declarações obrigatórias.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Inscrição enviada com sucesso! 🎉",
      description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('png') && !file.type.includes('pdf')) {
        toast({
          title: "Formato inválido",
          description: "Por favor, envie apenas arquivos PNG ou PDF.",
          variant: "destructive",
        });
        return;
      }
      setFormData({ ...formData, arquivo: file });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-mascot border-2 border-unifap-cyan/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-retro text-unifap-blue mb-4">
          📝 Formulário de Inscrição
        </CardTitle>
        <p className="text-unifap-blue/80 font-medium">
          Concurso do Mascote UniFAP
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Participante */}
          <div className="space-y-6">
            <h3 className="text-xl font-retro text-unifap-orange flex items-center gap-2">
              👤 Dados do Participante
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome" className="text-unifap-blue font-medium">Nome completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="curso" className="text-unifap-blue font-medium">Curso *</Label>
                <Input
                  id="curso"
                  value={formData.curso}
                  onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="matricula" className="text-unifap-blue font-medium">Número de matrícula *</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
              </div>
              
              <div>
                <Label className="text-unifap-blue font-medium">Turno *</Label>
                <RadioGroup
                  value={formData.turno}
                  onValueChange={(value) => setFormData({ ...formData, turno: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manha" id="manha" />
                    <Label htmlFor="manha">Manhã</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="noite" id="noite" />
                    <Label htmlFor="noite">Noite</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ead" id="ead" />
                    <Label htmlFor="ead">EAD</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semipresencial" id="semipresencial" />
                    <Label htmlFor="semipresencial">Semipresencial</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="telefone" className="text-unifap-blue font-medium">Telefone (WhatsApp) *</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-unifap-blue font-medium">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
              </div>
            </div>
          </div>

          {/* Proposta do Mascote */}
          <div className="space-y-6">
            <h3 className="text-xl font-retro text-unifap-pink flex items-center gap-2">
              🎨 Proposta do Mascote
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeMascote" className="text-unifap-blue font-medium">Nome do mascote proposto *</Label>
                <Input
                  id="nomeMascote"
                  value={formData.nomeMascote}
                  onChange={(e) => setFormData({ ...formData, nomeMascote: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="arquivo" className="text-unifap-blue font-medium">Arquivo do desenho (PNG ou PDF apenas) *</Label>
                <Input
                  id="arquivo"
                  type="file"
                  accept=".png,.pdf"
                  onChange={handleFileChange}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan"
                  required
                />
                <p className="text-sm text-unifap-blue/60 mt-1">
                  Formatos aceitos: PNG, PDF
                </p>
              </div>
              
              <div>
                <Label htmlFor="justificativa" className="text-unifap-blue font-medium">Justificativa/Conceito do mascote *</Label>
                <Textarea
                  id="justificativa"
                  value={formData.justificativa}
                  onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                  className="border-unifap-cyan/30 focus:border-unifap-cyan min-h-32"
                  placeholder="Descreva o conceito e a justificativa da sua proposta de mascote..."
                  maxLength={1000}
                  required
                />
                <p className="text-sm text-unifap-blue/60 mt-1">
                  Máximo 10 linhas / 1000 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Declarações */}
          <div className="space-y-6">
            <h3 className="text-xl font-retro text-unifap-yellow flex items-center gap-2">
              📄 Declaração
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termos"
                  checked={formData.concordoTermos}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, concordoTermos: checked === true })
                  }
                  className="mt-1"
                />
                <Label htmlFor="termos" className="text-sm text-unifap-blue leading-relaxed">
                  Declaro que li e concordo com todos os termos e regras descritos no edital do concurso do mascote UniFAP.
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="originalidade"
                  checked={formData.declaroOriginalidade}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, declaroOriginalidade: checked === true })
                  }
                  className="mt-1"
                />
                <Label htmlFor="originalidade" className="text-sm text-unifap-blue leading-relaxed">
                  Declaro que a criação submetida é original, de minha autoria, e não é cópia total ou parcial de qualquer outro personagem, desenho ou marca existente.
                </Label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-vibrant hover:bg-gradient-warm text-white font-retro text-lg py-6 shadow-glow transition-all duration-300 hover:scale-[1.02]"
          >
            🚀 Enviar Inscrição
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MascotForm;