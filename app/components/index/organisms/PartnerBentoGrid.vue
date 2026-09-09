<script setup lang="ts">

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Carte Ardèche (Prend 2 colonnes sur grand écran) -->
        <div
            class="flex flex-col justify-between md:col-span-2 bg-(--bg-2)/20 dark:bg-(--bg-2)/10 p-8 rounded-2xl border border-(--border-subtle) gap-6 group hover:border-(--accent)/30 transition-all duration-300">
            <div class="max-w-md">
                <span class="fs-small font-semibold tracking-wider uppercase text-(--accent)">Territoire</span>
                <h3 class="fs-lead mt-2 text-(--text)">Un artisan du web juste à coté de chez vous.</h3>
                <p class="fs-small mt-2 text-(--text-3) leading-relaxed">
                    Parce qu'on travaille mieux quand on se comprend. En étant partenaire d'Emerveillé par l'Ardèche via Pollen SCOP, CodeKorico fait le choix de la proximité, du bon sens et du travail bien fait, ici, dans nos vallées.
                </p>
            </div>
            <div class="flex justify-start items-center">
                <img src="/images/logo/partenaires/emerveilles_par_ardeche.png" alt="Logo de Emerveillés par l'Ardèche"
                    class="h-14 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
        </div>

        <!-- Carte Pollen SCOP (Prend 1 colonne) -->
        <div
            class="flex flex-col justify-between bg-(--bg-2)/20 dark:bg-(--bg-2)/10 p-8 rounded-2xl border border-(--border-subtle) gap-6 group hover:border-(--accent)/30 transition-all duration-300">
            <div class="max-w-md">
                <span class="fs-small font-semibold tracking-wider uppercase text-(--accent)">Modèle Coopératif</span>
                <h3 class="fs-lead mt-2 text-(--text)">Pollen SCOP</h3>
                <p class="fs-small mt-2 text-(--text-3) leading-relaxed">
                    Derrière CodeKorico, il y a un entrepreneur, mais aussi un collectif. C'est pour vous vous garantir un accompagnement honnête, transparent et basé sur l'entraide que j'ai fais le choix de rejoindre Pollen.
                </p>
            </div>
            <div class="flex justify-start items-center">
                <img src="/images/logo/partenaires/pollen_scop.png" alt="Logo de la CAE Pollen SCOP" width="57"
                    height="57"
                    class="h-12 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>