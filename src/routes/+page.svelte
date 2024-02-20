<script>
    export let data;
</script>

<div class="row">
    <h1>Bienvenue</h1>
    <h2>{data.userEmail}</h2>
    {#if data.userEmail}
        <div class="mt-4">
            <a href="/logout">Se déconnecter</a>
        </div>
    {/if}
</div>

<style>
div {
    text-align: center;
    margin-top: 100px;
}
</style>