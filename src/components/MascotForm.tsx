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

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const requiredFields = [
    'nome', 'curso', 'matricula', 'turno', 'telefone', 'email',
    'nomeMascote', 'justificativa'
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

  if (!formData.arquivo) {
    toast({
      title: "Arquivo obrigatório",
      description: "Anexe o arquivo PNG ou PDF do mascote.",
      variant: "destructive",
    });
    return;
  }

  if (!formData.concordoTermos || !formData.declaroOriginalidade) {
    toast({
      title: "Declarações obrigatórias",
      description: "Marque todas as declarações antes de enviar.",
      variant: "destructive",
    });
    return;
  }

  try {
    const webhookUrl = "https://hook.us2.make.com/rrwwnw9mt93xzypyprtjci8s6svos5mq";
    const data = new FormData();

    data.append("nome", formData.nome);
    data.append("curso", formData.curso);
    data.append("matricula", formData.matricula);
    data.append("turno", formData.turno);
    data.append("telefone", formData.telefone);
    data.append("email", formData.email);
    data.append("nomeMascote", formData.nomeMascote);
    data.append("justificativa", formData.justificativa);
    data.append("concordoTermos", String(formData.concordoTermos));
    data.append("declaroOriginalidade", String(formData.declaroOriginalidade));
    data.append("arquivo", formData.arquivo); // O arquivo já validado

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar para o webhook");
    }

    toast({
      title: "Inscrição enviada com sucesso! 🎉",
      description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
    });

    // Limpa o formulário
    setFormData({
      nome: "",
      curso: "",
      matricula: "",
      turno: "",
      telefone: "",
      email: "",
      nomeMascote: "",
      arquivo: null,
      justificativa: "",
      concordoTermos: false,
      declaroOriginalidade: false,
    });

    // Opcional: resetar campo de arquivo no input
    (document.getElementById("arquivo") as HTMLInputElement).value = "";

  } catch (error) {
    toast({
      title: "Erro ao enviar inscrição",
      description: "Houve um problema ao enviar os dados. Tente novamente.",
      variant: "destructive",
    });
    console.error(error);
  }
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
    <Card className="w-full max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-sm shadow-2xl border border-gray-700 rounded-2xl">
      <CardHeader className="text-center border-b border-gray-700/50 pb-8">
        <CardTitle className="text-3xl font-retro text-white mb-4">
          📝 Formulário de Inscrição
        </CardTitle>
        <p className="text-gray-300 font-medium">
          Concurso do Mascote UniFAP
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Participante */}
          <div className="space-y-6">
            <h3 className="text-xl font-retro text-unifap-orange flex items-center gap-2">
              👤 Dados do Participante
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nome" className="text-white font-medium mb-3 block">Nome completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-cyan text-white rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400"
                  placeholder="Seu nome"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white font-medium mb-3 block">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-cyan text-white rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="curso" className="text-white font-medium mb-3 block">Curso *</Label>
                <Input
                  id="curso"
                  value={formData.curso}
                  onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-cyan text-white rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400"
                  placeholder="Nome do seu curso"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="telefone" className="text-white font-medium mb-3 block">Telefone/WhatsApp</Label>
                <Input
                  id="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-cyan text-white rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400"
                  placeholder="(88) 99999-9999"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="matricula" className="text-white font-medium mb-3 block">Número de matrícula *</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-cyan text-white rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400"
                  placeholder="Sua matrícula"
                  required
                />
              </div>
              
              <div>
                <Label className="text-white font-medium mb-3 block">Turno *</Label>
                <RadioGroup
                  value={formData.turno}
                  onValueChange={(value) => setFormData({ ...formData, turno: value })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                    <RadioGroupItem value="manha" id="manha" className="border-gray-500 text-unifap-cyan" />
                    <Label htmlFor="manha" className="text-white cursor-pointer">Manhã</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                    <RadioGroupItem value="noite" id="noite" className="border-gray-500 text-unifap-cyan" />
                    <Label htmlFor="noite" className="text-white cursor-pointer">Noite</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                    <RadioGroupItem value="ead" id="ead" className="border-gray-500 text-unifap-cyan" />
                    <Label htmlFor="ead" className="text-white cursor-pointer">EAD</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors">
                    <RadioGroupItem value="semipresencial" id="semipresencial" className="border-gray-500 text-unifap-cyan" />
                    <Label htmlFor="semipresencial" className="text-white cursor-pointer">Semipresencial</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Proposta do Mascote */}
          <div className="space-y-6 border-t border-gray-700/50 pt-8">
            <h3 className="text-xl font-retro text-unifap-pink flex items-center gap-2">
              🎨 Proposta do Mascote
            </h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="nomeMascote" className="text-white font-medium mb-3 block">Nome do mascote proposto *</Label>
                <Input
                  id="nomeMascote"
                  value={formData.nomeMascote}
                  onChange={(e) => setFormData({ ...formData, nomeMascote: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-pink text-white rounded-lg px-4 py-4 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400"
                  placeholder="Nome do seu mascote"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="arquivo" className="text-white font-medium mb-3 block">Arquivo do desenho (PNG ou PDF apenas) *</Label>
                <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-unifap-pink transition-colors">
                  <Input
  id="arquivo"
  type="file"
  accept=".png,.pdf"
  onChange={handleFileChange}
  className="w-full cursor-pointer text-white bg-transparent border-none file:cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-unifap-orange file:text-white hover:file:bg-unifap-orange/90 file:transition-all"
/>
                  <p className="text-sm text-gray-400 mt-3">
                    Formatos aceitos: PNG, PDF (máx. 10MB)
                  </p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="justificativa" className="text-white font-medium mb-3 block">Justificativa/Conceito do mascote *</Label>
                <Textarea
                  id="justificativa"
                  value={formData.justificativa}
                  onChange={(e) => setFormData({ ...formData, justificativa: e.target.value })}
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-pink text-white rounded-lg px-4 py-4 min-h-32 transition-all duration-200 hover:border-gray-500 placeholder:text-gray-400 resize-none"
                  placeholder="Descreva o conceito e a justificativa da sua proposta de mascote..."
                  maxLength={1000}
                  required
                />
              </div>
            </div>
          </div>

          {/* Declarações */}
          <div className="space-y-6 border-t border-gray-700/50 pt-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 bg-gray-800/30 p-4 rounded-lg border border-gray-600">
                <Checkbox
                  id="termos"
                  checked={formData.concordoTermos}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, concordoTermos: checked === true })
                  }
                  className="mt-1 border-gray-500 data-[state=checked]:bg-unifap-cyan data-[state=checked]:border-unifap-cyan"
                />
                <Label htmlFor="termos" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                  Declaro que li e concordo com todos os termos e regras descritos no edital do concurso do mascote UniFAP.
                </Label>
              </div>
              
              <div className="flex items-start space-x-3 bg-gray-800/30 p-4 rounded-lg border border-gray-600">
                <Checkbox
                  id="originalidade"
                  checked={formData.declaroOriginalidade}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, declaroOriginalidade: checked === true })
                  }
                  className="mt-1 border-gray-500 data-[state=checked]:bg-unifap-cyan data-[state=checked]:border-unifap-cyan"
                />
                <Label htmlFor="originalidade" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
                  Declaro que a criação submetida é original, de minha autoria, e não é cópia total ou parcial de qualquer outro personagem, desenho ou marca existente.
                </Label>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button
              type="submit"
              className="bg-unifap-orange hover:bg-unifap-orange/90 text-white font-semibold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-0"
            >
              ✈️ Enviar informações
            </Button>
          </div>

                    {/* O que você receberá */}
          <div className="bg-gray-800/30 border border-gray-600 rounded-lg p-6 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-unifap-orange rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <h4 className="text-white font-semibold">O que faremos com as informações que você enviar?</h4>
            </div>
            <ul className="space-y-2 text-gray-300 ml-9">
              <li>• Análise detalhada da sua proposta de mascote</li>
              <li>• Feedback sobre o conceito</li>
            </ul>
            <div className="text-center mt-6">
              <a
                href="https://link-do-edital.com/edital.pdf" // 👉 substitua aqui pelo link real do edital
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-transparent text-unifap-cyan border border-unifap-cyan px-6 py-3 rounded-lg font-medium text-sm hover:bg-unifap-cyan hover:text-white transition-all"
              >
                📄 Acessar Edital do Concurso
              </a>
          </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default MascotForm;
