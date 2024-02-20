<script>
    export let data;
</script>

<div class="row">
    <h1>Bienvenue</h1>
    <h2>{data.userEmail}</h2>
    <a href="/login" class="mt-4">Se connecter</a>
</div>

<style>
div {
    text-align: center;
    margin-top: 100px;
}
</style>