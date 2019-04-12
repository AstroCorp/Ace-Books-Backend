<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class phpunit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:phpunit';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Use phpunit';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $process = new Process(['./vendor/bin/phpunit']);
        $process->setTty(true);

        try
        {
            $process->mustRun();
            echo $process->getOutput();
        }
        catch (ProcessFailedException $exception)
        {
            echo $exception->getMessage();
        }
    }
}
