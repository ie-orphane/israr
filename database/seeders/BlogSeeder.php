<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title_fr' => 'Une plateforme numérique pour mieux informer et accompagner',
                'title_ar' => 'منصة رقمية أفضل للإخبار والمواكبة',
                'excerpt_fr' => 'Le blog ISRAR met en avant nos actions, nos campagnes et les ressources utiles pour les femmes et les acteurs de terrain.',
                'excerpt_ar' => 'تسلط مدونة إصرار الضوء على أنشطتنا وحملاتنا والموارد المفيدة للنساء والفاعلين الميدانيين.',
                'body_fr' => '<p>Ce premier article présente l’esprit du blog : partager des expériences, des analyses et des outils concrets au service de l’égalité et de la protection des droits.</p><p>Nous publierons ici des actualités, des retours de terrain et des décryptages juridiques.</p>',
                'body_ar' => '<p>يقدم هذا المقال الأول روح المدونة: تقاسم التجارب والتحليلات والأدوات العملية في خدمة المساواة وحماية الحقوق.</p><p>سننشر هنا المستجدات والتجارب الميدانية وقراءات قانونية مبسطة.</p>',
                'category_fr' => 'Actualités',
                'category_ar' => 'أخبار',
                'author' => 'Équipe ISRAR',
                'published_at' => now()->subDays(10),
                'is_published' => true,
            ],
            [
                'title_fr' => 'Comprendre les ressources juridiques disponibles',
                'title_ar' => 'فهم الموارد القانونية المتاحة',
                'excerpt_fr' => 'Un guide pratique pour naviguer dans les contenus de la base juridique et mieux orienter les personnes accompagnées.',
                'excerpt_ar' => 'دليل عملي للتنقل داخل القاعدة القانونية وتوجيه المستفيدات والمستفيدين بشكل أفضل.',
                'body_fr' => '<p>La base juridique d’ISRAR rassemble lois, jurisprudences et guides. Cet article montre comment l’utiliser efficacement pour rechercher une information précise.</p>',
                'body_ar' => '<p>تجمع القاعدة القانونية لإصرار القوانين والاجتهادات والدلائل. يشرح هذا المقال كيف يمكن استعمالها بشكل فعال للعثور على معلومة دقيقة.</p>',
                'category_fr' => 'Plaidoyer',
                'category_ar' => 'مرافعة',
                'author' => 'ISRAR',
                'published_at' => now()->subDays(5),
                'is_published' => true,
            ],
            [
                'title_fr' => 'Territoires, impact et récits de terrain',
                'title_ar' => 'المجالات والأثر وحكايات الميدان',
                'excerpt_fr' => 'Des témoignages et des chiffres pour rendre visibles les effets des projets déployés sur le terrain.',
                'excerpt_ar' => 'شهادات وأرقام لإبراز أثر المشاريع المنجزة على أرض الواقع.',
                'body_fr' => '<p>Nos projets prennent vie grâce aux partenaires locaux, aux associations et aux bénéficiaires. Cette rubrique permettra de documenter ces impacts de manière régulière.</p>',
                'body_ar' => '<p>تأخذ مشاريعنا شكلها بفضل الشركاء المحليين والجمعيات والمستفيدات. ستوثق هذه الركن تلك الآثار بشكل منتظم.</p>',
                'category_fr' => 'Terrain',
                'category_ar' => 'ميدان',
                'author' => 'Rédaction ISRAR',
                'published_at' => now()->subDay(),
                'is_published' => true,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::query()->create($blog);
        }
    }
}
