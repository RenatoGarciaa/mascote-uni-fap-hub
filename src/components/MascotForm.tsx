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
      data.append("arquivo", formData.arquivo);

      const response = await fetch(webhookUrl, {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Erro ao enviar para o webhook");

      toast({
        title: "Inscrição enviada com sucesso! 🎉",
        description: "Sua proposta de mascote foi recebida. Boa sorte no concurso!",
      });

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
          {/* ...seção mantida como já está... */}

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
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-pink text-white rounded-lg px-4 py-4"
                  placeholder="Nome do seu mascote"
                  required
                />
              </div>

              <div>
                <Label htmlFor="arquivo" className="text-white font-medium mb-3 block">Arquivo do desenho (PNG ou PDF apenas) *</Label>
                <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg px-6 py-8 text-center hover:border-unifap-pink transition-colors">
                  <label
                    htmlFor="arquivo"
                    className="cursor-pointer inline-flex items-center justify-center bg-unifap-orange text-white font-semibold text-sm rounded-full px-6 py-3 hover:bg-unifap-orange/90 transition-all duration-200"
                  >
                    Escolher arquivo
                  </label>

                  <Input
                    id="arquivo"
                    type="file"
                    accept=".png,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />

                  <p className="text-sm text-white mt-3">
                    {formData.arquivo ? formData.arquivo.name : "Nenhum arquivo escolhido"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
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
                  className="bg-gray-800/80 border border-gray-600 focus:border-unifap-pink text-white rounded-lg px-4 py-4 min-h-32"
                  placeholder="Descreva o conceito e a justificativa da sua proposta de mascote..."
                  maxLength={1000}
                  required
                />
              </div>
            </div>
          </div>

          {/* Declarações */}
          {/* ...declarações mantidas como já estavam... */}

          <div className="text-center pt-8">
            <Button
              type="submit"
              className="bg-unifap-orange hover:bg-unifap-orange/90 text-white font-semibold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border-0"
            >
              ✈️ Enviar informações
            </Button>
          </div>

          {/* O que você receberá + Botão edital */}
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
                href="https://link-do-edital.com/edital.pdf"
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
