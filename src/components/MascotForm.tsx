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
    <Card className="w-full max-w-4xl mx-auto bg-white/98 backdrop-blur-sm shadow-mascot border-2 border-unifap-cyan/30 rounded-2xl">
      <CardHeader className="text-center bg-gradient-to-r from-unifap-cyan/10 to-unifap-blue/10 rounded-t-2xl">
        <CardTitle className="text-3xl font-retro text-unifap-blue mb-4">
          📝 Formulário de Inscrição
        </CardTitle>
        <p className="text-unifap-blue/80 font-medium">
          Concurso do Mascote UniFAP
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Participante */}
          <div className="space-y-6 bg-gray-50/50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-retro text-unifap-orange flex items-center gap-2">
              👤 Dados do Participante
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome" className="text-gray-800 font-medium mb-2 block">Nome completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-cyan text-gray-900 rounded-lg px-4 py-3 transition-all duration-200 hover:border-gray-400"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="curso" className="text-gray-800 font-medium mb-2 block">Curso *</Label>
                <Input
                  id="curso"
                  value={formData.curso}
                  onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-cyan text-gray-900 rounded-lg px-4 py-3 transition-all duration-200 hover:border-gray-400"
                  placeholder="Digite seu curso"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="matricula" className="text-gray-800 font-medium mb-2 block">Número de matrícula *</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-cyan text-gray-900 rounded-lg px-4 py-3 transition-all duration-200 hover:border-gray-400"
                  placeholder="Digite seu número de matrícula"
                  required
                />
              </div>
              
              <div>
                <Label className="text-gray-800 font-medium mb-3 block">Turno *</Label>
                <RadioGroup
                  value={formData.turno}
                  onValueChange={(value) => setFormData({ ...formData, turno: value })}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-unifap-cyan/50 transition-colors">
                    <RadioGroupItem value="manha" id="manha" className="border-gray-400" />
                    <Label htmlFor="manha" className="text-gray-800 cursor-pointer">Manhã</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-unifap-cyan/50 transition-colors">
                    <RadioGroupItem value="noite" id="noite" className="border-gray-400" />
                    <Label htmlFor="noite" className="text-gray-800 cursor-pointer">Noite</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-unifap-cyan/50 transition-colors">
                    <RadioGroupItem value="ead" id="ead" className="border-gray-400" />
                    <Label htmlFor="ead" className="text-gray-800 cursor-pointer">EAD</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-gray-200 hover:border-unifap-cyan/50 transition-colors">
                    <RadioGroupItem value="semipresencial" id="semipresencial" className="border-gray-400" />
                    <Label htmlFor="semipresencial" className="text-gray-800 cursor-pointer">Semipresencial</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="telefone" className="text-gray-800 font-medium mb-2 block">Telefone (WhatsApp) *</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-cyan text-gray-900 rounded-lg px-4 py-3 transition-all duration-200 hover:border-gray-400"
                  placeholder="(xx) xxxxx-xxxx"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-800 font-medium mb-2 block">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-cyan text-gray-900 rounded-lg px-4 py-3 transition-all duration-200 hover:border-gray-400"
                  placeholder="seu.email@exemplo.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Proposta do Mascote */}
          <div className="space-y-6 bg-pink-50/50 p-6 rounded-xl border border-pink-200">
            <h3 className="text-xl font-retro text-unifap-pink flex items-center gap-2">
              🎨 Proposta do Mascote
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nomeMascote" className="text-gray-800 font-medium mb-2 block">Nome do mascote proposto *</Label>
                <Input
                  id="nomeMascote"
                  value={formData.nomeMascote}
                  onChange={(e) => setFormData({ ...formData, nomeMascote: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-pink text-gray-900 rounded-lg px-4 py-3 transition-all duration-200 hover:border-gray-400"
                  placeholder="Digite o nome do seu mascote"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="arquivo" className="text-gray-800 font-medium mb-2 block">Arquivo do desenho (PNG ou PDF apenas) *</Label>
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-unifap-pink transition-colors">
                  <Input
                    id="arquivo"
                    type="file"
                    accept=".png,.pdf"
                    onChange={handleFileChange}
                    className="bg-transparent border-none text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-unifap-pink file:text-white hover:file:bg-unifap-pink/90"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Formatos aceitos: PNG, PDF (máx. 10MB)
                  </p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="justificativa" className="text-gray-800 font-medium mb-2 block">Justificativa/Conceito do mascote *</Label>
                <Textarea
                  id="justificativa"
                  value={formData.justificativa}
                  onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-unifap-pink text-gray-900 rounded-lg px-4 py-3 min-h-32 transition-all duration-200 hover:border-gray-400"
                  placeholder="Descreva o conceito e a justificativa da sua proposta de mascote..."
                  maxLength={1000}
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  Máximo 10 linhas / 1000 caracteres
                </p>
              </div>
            </div>
          </div>

          {/* Declarações */}
          <div className="space-y-6 bg-yellow-50/50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-xl font-retro text-unifap-yellow flex items-center gap-2">
              📄 Declaração
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-200">
                <Checkbox
                  id="termos"
                  checked={formData.concordoTermos}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, concordoTermos: checked === true })
                  }
                  className="mt-1 border-gray-400"
                />
                <Label htmlFor="termos" className="text-sm text-gray-800 leading-relaxed cursor-pointer">
                  Declaro que li e concordo com todos os termos e regras descritos no edital do concurso do mascote UniFAP.
                </Label>
              </div>
              
              <div className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-gray-200">
                <Checkbox
                  id="originalidade"
                  checked={formData.declaroOriginalidade}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, declaroOriginalidade: checked === true })
                  }
                  className="mt-1 border-gray-400"
                />
                <Label htmlFor="originalidade" className="text-sm text-gray-800 leading-relaxed cursor-pointer">
                  Declaro que a criação submetida é original, de minha autoria, e não é cópia total ou parcial de qualquer outro personagem, desenho ou marca existente.
                </Label>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button
              type="submit"
              className="bg-gradient-vibrant hover:bg-gradient-warm text-white font-retro text-lg md:text-xl px-12 py-6 rounded-full shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              🚀 Enviar Inscrição
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MascotForm;